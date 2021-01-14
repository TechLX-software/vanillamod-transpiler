"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _ErrorOutline = _interopRequireDefault(require("@material-ui/icons/ErrorOutline"));

var _CheckCircleOutline = _interopRequireDefault(require("@material-ui/icons/CheckCircleOutline"));

var _react2 = _interopRequireWildcard(require("@monaco-editor/react"));

var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));

var _transpilerHandler = require("./transpilerHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _styles.makeStyles)({
  fatButton: {
    marginLeft: "5px",
    marginRight: "5px",
    borderRadius: "0.5em"
  },
  fatButtonText: {
    fontWeight: "bold"
  },
  editorTitle: {
    paddingLeft: "20px",
    fontWeight: "bold"
  }
});

function displayErrors(errorMarkers, editor, monacoAlive) {
  if (errorMarkers.length < 1) {// something funky happened, we got an error but didn't handle it smoothly
    // usually means vMod library has a bug
  } else {
    monacoAlive.editor.setModelMarkers(editor.getModel(), "vanillamod", errorMarkers);
    setTimeout(function () {
      var firstError = errorMarkers[0];
      editor.setPosition({
        lineNumber: firstError.startLineNumber,
        column: firstError.startColumn
      });
      editor.getAction("editor.action.showHover").run();
      var actionContainer = document.getElementsByClassName("action-container");
      if (actionContainer.length > 0) actionContainer[0].click();
    }, 100);
  } // display red X thingy saying errors were found

}

function VModEditor(_ref) {
  var title = _ref.title,
      startingCode = _ref.startingCode;
  var classes = useStyles();

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      monacoAlive = _useState2[0],
      setMonacoAlive = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      errorInfo = _useState4[0],
      setErrorInfo = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      clearErrorInfo = _useState6[0],
      setClearErrorInfo = _useState6[1];

  var editorRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    _react2.monaco.init().then(function (initializedMonaco) {
      setMonacoAlive(initializedMonaco);
    });
  }, []);

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  function showErrorInfo(errorMarkers) {
    var errorCount = errorMarkers ? errorMarkers.length : 0; // still need to figure out what to do when error markers
    // exists, but is not zero (which is a vMod "crash")
    // see top part of displayErrors(...)

    setErrorInfo( /*#__PURE__*/_react.default.createElement(ErrorInfo, {
      errorCount: errorCount
    }));
    if (clearErrorInfo) clearTimeout(clearErrorInfo);
    var newClear = setTimeout(function () {
      setErrorInfo(null);
    }, 8000);
    setClearErrorInfo(newClear);
  }

  function checkButtonClicked() {
    var modInfo = {
      modName: title
    };
    var code = editorRef.current.getValue();

    var _transpileCode = (0, _transpilerHandler.transpileCode)(code, modInfo, editorRef.current, monacoAlive),
        errorMarkers = _transpileCode.errorMarkers;

    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoAlive);
    }

    showErrorInfo(errorMarkers);
  }

  function downloadButtonClicked() {
    var modInfo = {
      modName: title
    };
    var code = editorRef.current.getValue();

    var _transpileCode2 = (0, _transpilerHandler.transpileCode)(code, modInfo, editorRef.current, monacoAlive),
        datapack = _transpileCode2.datapack,
        errorMarkers = _transpileCode2.errorMarkers;

    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoAlive);
      showErrorInfo(errorMarkers);
    } else {
      (0, _transpilerHandler.downloadDatapack)(datapack);
    }
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Toolbar, {
    className: _stylesModule.default.editorHeader
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    width: "60%",
    display: "inline-block"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h4",
    classes: {
      root: classes.editorTitle
    }
  }, title)), /*#__PURE__*/_react.default.createElement(_core.Box, {
    width: "40%",
    display: "inline-block"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "center"
  }, errorInfo, /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "outlined",
    color: "secondary",
    size: "large",
    classes: {
      root: classes.fatButton,
      label: classes.fatButtonText
    },
    onClick: checkButtonClicked
  }, "Check"), /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    size: "large",
    classes: {
      root: classes.fatButton,
      label: classes.fatButtonText
    },
    onClick: downloadButtonClicked
  }, "Download")))), /*#__PURE__*/_react.default.createElement(_react2.default, {
    height: "85vh",
    language: "javascript",
    theme: "dark",
    options: {
      fontSize: 15,
      minimap: {
        enabled: false
      }
    },
    editorDidMount: handleEditorDidMount,
    value: startingCode
  }));
}

VModEditor.propTypes = {
  startingCode: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired
};

function ErrorInfo(_ref2) {
  var errorCount = _ref2.errorCount;
  // expand this eventually to have a modal button that displays
  // a list of all the errors
  return /*#__PURE__*/_react.default.createElement(_core.Box, {
    width: "30%"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "space-evenly",
    alignItems: "center"
  }, errorCount ? /*#__PURE__*/_react.default.createElement(_ErrorOutline.default, {
    color: "error"
  }) : /*#__PURE__*/_react.default.createElement(_CheckCircleOutline.default, {
    color: "secondary"
  }), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    color: errorCount ? "error" : "secondary"
  }, errorCount ? "".concat(errorCount, " Error").concat(errorCount > 1 ? "s" : "") : "No Errors!")));
}

ErrorInfo.propTypes = {
  errorCount: _propTypes.default.number.isRequired
};
var _default = VModEditor;
exports.default = _default;

//# sourceMappingURL=vModEditor.jsx.map