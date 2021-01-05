import transpiler from "../transpiler";

function addCustomError(error, editor, monacoAlive) {
  if (error.location) {
    let startLine;
    let startCol;
    let endLine;
    let endCol;
    if (error.location.esprima) {
      startLine = error.location.line;
      startCol = error.location.col;
      const line = editor.getModel().getLineContent(startLine);
      const nextSpace = line.indexOf(" ", startCol);
      endCol = nextSpace >= 0 ? nextSpace : line.length;
      endLine = error.location.line;
    } else {
      // vanillamod error
      startLine = error.location.start.line;
      startCol = error.location.start.column + 1;
      endLine = error.location.end.line;
      endCol = error.location.end.column + 1;
    }
    return {
      startLineNumber: startLine,
      startColumn: startCol,
      endLineNumber: endLine,
      endColumn: endCol,
      message: error.message,
      severity: monacoAlive.MarkerSeverity.Error,
    };
  }
  
  // eslint-disable-next-line no-console
  console.error("NO ERROR LOCATION:", error);
  return null;
}

function checkForErrors(code, modInfo, editor, monaco) {
  // reset model markers to get rid of old errors
  monaco.editor.setModelMarkers(
    editor.getModel(),
    "vanillamod",
    []
  );

  const datapack = transpiler.compile(code, modInfo);
  if (datapack.errors && monaco) {
    const underlineMarkers = [];
    datapack.errors.forEach((error) => {
      const marker = addCustomError(error, editor, monaco);
      if (marker) underlineMarkers.push(marker);
    });
    return underlineMarkers;
  }

  return null;
}

function downloadMod(code, modInfo) {
  console.log("downloading woot woot")
}

export { checkForErrors, downloadMod };