function compile(code) {
  const input = "index.ts";
  const output = "index.js";

  const sources = new Map([[input, code]]);
  const results = new Map();

  ts.createProgram([input], {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    noResolve: true,
  }, {
    getSourceFile: function (fileName, languageVersion, _onError) {
      const sourceText = this.readFile(fileName);
      return sourceText !== undefined
        ? ts.createSourceFile(fileName, sourceText, languageVersion)
        : undefined;
    },
    getDefaultLibFileName: (defaultLibOptions) => "/" + ts.getDefaultLibFileName(defaultLibOptions),
    writeFile: (fileName, content) => results.set(fileName, content),
    getCurrentDirectory: () => "/",
    getDirectories: (_path) => [],
    fileExists: () => true,
    readFile: (fileName) => sources.get(fileName),
    getCanonicalFileName: (fileName) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    getEnvironmentVariable: () => "",
    resolveModuleNames: () => [],
  }).emit();

  return results.get(output);
}
