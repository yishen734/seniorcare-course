import { mkdir, copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const directory = path.dirname(require.resolve('typescript'));
await mkdir('public/compiler', { recursive: true });
for (const name of [
  'typescript.js',
  'lib.es5.d.ts',
  'lib.es2015.symbol.d.ts',
  'lib.es2015.iterable.d.ts',
  'lib.decorators.d.ts',
  'lib.decorators.legacy.d.ts',
]) {
  await copyFile(path.join(directory, name), path.join('public/compiler', name));
}
