import { readdir, readFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Next 16.3's Windows exporter retains backslashes in segment filenames,
 * creating nested __next.* directories, while the client requests dot-separated
 * names. Add matching static aliases without modifying framework code or assets.
 * On platforms/releases that already emit flat names, this is a no-op.
 */
export async function normalizeStaticSegments(outputDirectory) {
  const root = path.resolve(outputDirectory);
  let added = 0;

  async function flatten(directory, routeDirectory, prefix) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = path.join(directory, entry.name);
      const name = `${prefix}.${entry.name}`;
      if (entry.isDirectory()) {
        await flatten(source, routeDirectory, name);
      } else if (entry.isFile() && entry.name.endsWith('.txt')) {
        const destination = path.join(routeDirectory, name);
        try {
          const existing = await readFile(destination);
          if (!existing.equals(await readFile(source))) {
            throw new Error(`Conflicting static segment: ${name}`);
          }
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
          await copyFile(source, destination);
          added += 1;
        }
      }
    }
  }

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === '_next') continue;
      const child = path.join(directory, entry.name);
      if (entry.name.startsWith('__next.')) await flatten(child, directory, entry.name);
      else await visit(child);
    }
  }

  await visit(root);
  return added;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const added = await normalizeStaticSegments('out');
  console.log(`Static export: ${added} Windows segment aliases added.`);
}
