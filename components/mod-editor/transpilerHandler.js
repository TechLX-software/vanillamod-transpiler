import JSZip from "jszip";
import { saveAs } from "file-saver";
// last left off:
// need to fix this import (want it to be local but yugh)
// might have to tag and publish transpiler first
// trying to run command:
// bit tag --message "first release" 

// pass this as a prop to get around bit import dumbness
// import { transpiler } from "@techlx/vanillamod.transpiler"

// handles all interactions with transpiler component

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

function transpileCode(transpiler, code, modInfo, editor, monaco) {
  // reset model markers to get rid of old errors
  monaco.editor.setModelMarkers(editor.getModel(), "vanillamod", []);

  console.log("just before error", transpiler);
  const datapack = transpiler.compile(code, modInfo);
  console.log("just after error");
  if (datapack.errors && monaco) {
    const errorMarkers = [];
    datapack.errors.forEach((error) => {
      const marker = addCustomError(error, editor, monaco);
      if (marker) errorMarkers.push(marker);
    });
    return { datapack, errorMarkers };
  }

  return { datapack, errorMarkers: null };
}

function buildDir(fileData, root) {
  if (fileData.type === "folder") {
    fileData.contents.forEach((nextFileData) => {
      buildDir(nextFileData, root.folder(fileData.name));
    });
  } else {
    if (fileData.type === "mcfunction") {
      fileData.contents = fileData.contents.join("\n");
    } else if (fileData.type === "json") {
      fileData.contents = JSON.stringify(fileData.contents, null, 4);
    }
    root.file(`${fileData.name}.${fileData.type}`, fileData.contents);
  }
}

function downloadDatapack(datapack) {
  const zip = new JSZip();
  zip.file("pack.mcmeta", JSON.stringify(datapack.mcmeta, null, 4));
  buildDir(datapack.data, zip);

  return zip
    .generateAsync({
      type: "blob",
    })
    .then((blob) => {
      saveAs(blob, `${datapack.modName}.zip`);
    });
}

export { transpileCode, downloadDatapack };
