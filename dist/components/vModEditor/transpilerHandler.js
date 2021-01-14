"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpileCode = transpileCode;
exports.downloadDatapack = downloadDatapack;

var _jszip = _interopRequireDefault(require("jszip"));

var _fileSaver = require("file-saver");

var _transpiler = _interopRequireDefault(require("../transpiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// handles all interactions with transpiler component
function addCustomError(error, editor, monacoAlive) {
  if (error.location) {
    var startLine;
    var startCol;
    var endLine;
    var endCol;

    if (error.location.esprima) {
      startLine = error.location.line;
      startCol = error.location.col;
      var line = editor.getModel().getLineContent(startLine);
      var nextSpace = line.indexOf(" ", startCol);
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
      severity: monacoAlive.MarkerSeverity.Error
    };
  } // eslint-disable-next-line no-console


  console.error("NO ERROR LOCATION:", error);
  return null;
}

function transpileCode(code, modInfo, editor, monaco) {
  // reset model markers to get rid of old errors
  monaco.editor.setModelMarkers(editor.getModel(), "vanillamod", []);

  var datapack = _transpiler.default.compile(code, modInfo);

  if (datapack.errors && monaco) {
    var errorMarkers = [];
    datapack.errors.forEach(function (error) {
      var marker = addCustomError(error, editor, monaco);
      if (marker) errorMarkers.push(marker);
    });
    return {
      datapack: datapack,
      errorMarkers: errorMarkers
    };
  }

  return {
    datapack: datapack,
    errorMarkers: null
  };
}

function buildDir(fileData, root) {
  if (fileData.type === "folder") {
    fileData.contents.forEach(function (nextFileData) {
      buildDir(nextFileData, root.folder(fileData.name));
    });
  } else {
    if (fileData.type === "mcfunction") {
      fileData.contents = fileData.contents.join("\n");
    } else if (fileData.type === "json") {
      fileData.contents = JSON.stringify(fileData.contents, null, 4);
    }

    root.file("".concat(fileData.name, ".").concat(fileData.type), fileData.contents);
  }
}

function downloadDatapack(datapack) {
  var zip = new _jszip.default();
  zip.file("pack.mcmeta", JSON.stringify(datapack.mcmeta, null, 4));
  buildDir(datapack.data, zip);
  return zip.generateAsync({
    type: "blob"
  }).then(function (blob) {
    (0, _fileSaver.saveAs)(blob, "".concat(datapack.modName, ".zip"));
  });
}

//# sourceMappingURL=transpilerHandler.js.map