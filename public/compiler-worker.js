/* global ts, importScripts */
// Runs the real TypeScript checker off the UI thread; all assets are local.
importScripts('/compiler/typescript.js');
const libraryNames = [
  'lib.es5.d.ts',
  'lib.es2015.symbol.d.ts',
  'lib.es2015.iterable.d.ts',
  'lib.decorators.d.ts',
  'lib.decorators.legacy.d.ts',
];
const libraries = Promise.all(
  libraryNames.map(async (name) => {
    const response = await fetch('/compiler/' + name);
    if (!response.ok) throw new Error('Cannot load ' + name);
    return ['/' + name, await response.text()];
  }),
);
self.onmessage = async (event) => {
  const { id, code } = event.data;
  try {
    const files = new Map(await libraries);
    files.set('/lesson.ts', code);
    files.set('/console.d.ts', 'declare const console: { log(...values: unknown[]): void };');
    const options = {
      strict: true,
      target: ts.ScriptTarget.ES2017,
      module: ts.ModuleKind.None,
      lib: ['lib.es5.d.ts', 'lib.es2015.iterable.d.ts'],
      noEmitOnError: true,
      skipLibCheck: true,
      types: [],
    };
    let javascript = '';
    const host = {
      getSourceFile: (name, languageVersion) => {
        const text = files.get(name);
        return text === undefined
          ? undefined
          : ts.createSourceFile(name, text, languageVersion, true);
      },
      getDefaultLibFileName: () => '/lib.es5.d.ts',
      writeFile: (name, text) => {
        if (name.endsWith('.js')) javascript = text;
      },
      getCurrentDirectory: () => '/',
      getDirectories: () => [],
      fileExists: (name) => files.has(name),
      readFile: (name) => files.get(name),
      getCanonicalFileName: (name) => name,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => '\n',
    };
    const program = ts.createProgram(['/lesson.ts', '/console.d.ts'], options, host);
    const diagnostics = ts.getPreEmitDiagnostics(program).map((d) => {
      const position =
        d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : undefined;
      return {
        code: d.code,
        line: position ? position.line + 1 : undefined,
        character: position ? position.character + 1 : undefined,
        message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
      };
    });
    if (diagnostics.length === 0) program.emit();
    self.postMessage({ id, diagnostics, javascript });
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  }
};
