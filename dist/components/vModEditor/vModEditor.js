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

var _react2 = _interopRequireDefault(require("@monaco-editor/react"));

var _transpilerHandler = require("./transpilerHandler");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  },
  editorHeader: {
    height: "5em",
    alignItems: "center",
    justifyContent: "space-between"
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
      startingCode = _ref.startingCode,
      isDarkTheme = _ref.isDarkTheme;
  var classes = useStyles(); // const [monacoAlive, setMonacoAlive] = useState(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      errorInfo = _useState2[0],
      setErrorInfo = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      clearErrorInfo = _useState4[0],
      setClearErrorInfo = _useState4[1]; // const monaco = useMonaco();
  // const editorRef = useRef();


  var editorRef = (0, _react.useRef)(null);
  var monacoRef = (0, _react.useRef)(null);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do stuff before editor is mounted
    // like removing DOM library and adding
    // vmod constants for intellisense
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  function showErrorInfo(errorMarkers) {
    var errorCount = errorMarkers ? errorMarkers.length : 0; // still need to figure out what to do when error markers
    // exists, but is not zero (which is a vMod "crash")
    // see top part of displayErrors(...)

    setErrorInfo( /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorInfo, {
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

    var _transpileCode = (0, _transpilerHandler.transpileCode)(code, modInfo, editorRef.current, monacoRef.current),
        errorMarkers = _transpileCode.errorMarkers;

    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoRef.current);
    }

    showErrorInfo(errorMarkers);
  }

  function downloadButtonClicked() {
    var modInfo = {
      modName: title
    };
    var code = editorRef.current.getValue();

    var _transpileCode2 = (0, _transpilerHandler.transpileCode)(code, modInfo, editorRef.current, monacoRef.current),
        datapack = _transpileCode2.datapack,
        errorMarkers = _transpileCode2.errorMarkers;

    if (errorMarkers) {
      displayErrors(errorMarkers, editorRef.current, monacoRef.current);
      showErrorInfo(errorMarkers);
    } else {
      (0, _transpilerHandler.downloadDatapack)(datapack);
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_core.Toolbar, {
      classes: {
        root: classes.editorHeader
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Box, {
        width: "60%",
        display: "inline-block",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Typography, {
          variant: "h4",
          classes: {
            root: classes.editorTitle
          },
          children: title
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Box, {
        width: "40%",
        display: "inline-block",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_core.Grid, {
          container: true,
          direction: "row",
          justify: "flex-end",
          alignItems: "center",
          children: [errorInfo, /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Button, {
            variant: "outlined",
            color: "secondary",
            size: "large",
            classes: {
              root: classes.fatButton,
              label: classes.fatButtonText
            },
            onClick: checkButtonClicked,
            children: "Check"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Button, {
            variant: "contained",
            color: "primary",
            size: "large",
            classes: {
              root: classes.fatButton,
              label: classes.fatButtonText
            },
            onClick: downloadButtonClicked,
            children: "Download"
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.default, {
      height: "85vh",
      language: "javascript",
      theme: isDarkTheme ? "vs-dark" : "light",
      options: {
        fontSize: 15,
        minimap: {
          enabled: false
        }
      },
      beforeMount: handleEditorWillMount,
      onMount: handleEditorDidMount,
      value: startingCode
    })]
  });
}

VModEditor.propTypes = {
  startingCode: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired,
  isDarkTheme: _propTypes.default.bool
};
VModEditor.defaultProps = {
  isDarkTheme: false
};

function ErrorInfo(_ref2) {
  var errorCount = _ref2.errorCount;
  // expand this eventually to have a modal button that displays
  // a list of all the errors
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Box, {
    width: "30%",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_core.Grid, {
      container: true,
      direction: "row",
      justify: "space-evenly",
      alignItems: "center",
      children: [errorCount ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorOutline.default, {
        color: "error"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckCircleOutline.default, {
        color: "secondary"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Typography, {
        color: errorCount ? "error" : "secondary",
        children: errorCount ? "".concat(errorCount, " Error").concat(errorCount > 1 ? "s" : "") : "No Errors!"
      })]
    })
  });
}

ErrorInfo.propTypes = {
  errorCount: _propTypes.default.number.isRequired
};
var _default = VModEditor;
exports.default = _default;

//# sourceMappingURL=vModEditor.jsx.map