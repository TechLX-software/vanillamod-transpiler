"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _reactSplitPane = _interopRequireDefault(require("react-split-pane"));

var _Pane = _interopRequireDefault(require("react-split-pane/lib/Pane"));

var _vModEditor = _interopRequireDefault(require("./vModEditor"));

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
  expandLeftButton: {
    position: "absolute",
    top: "65px",
    left: "5px",
    padding: "0px",
    minWidth: "30px",
    width: "30px",
    height: "25px"
  }
});

function EditorView(_ref) {
  var title = _ref.title,
      startingCode = _ref.startingCode,
      isDarkTheme = _ref.isDarkTheme,
      children = _ref.children;
  var classes = useStyles();

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLeftPanelContent = _useState2[0],
      setShowLeftPanelContent = _useState2[1];

  var editorViewRef = _react.default.useRef();

  var changeLeftPanel = function changeLeftPanel(sizes) {
    var leftSize = parseFloat(sizes[0], 10);

    if (leftSize < 10) {
      setShowLeftPanelContent(false);
    } else {
      setShowLeftPanelContent(true);
    }
  };

  (0, _react.useEffect)(function () {
    var draggables = editorViewRef.current.querySelectorAll("div[data-type='Resizer']");

    if (draggables) {
      draggables.forEach(function (elem) {
        elem.style.opacity = 0;
      });
    }
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: editorViewRef,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactSplitPane.default, {
      split: "vertical",
      onResizeEnd: changeLeftPanel,
      children: [showLeftPanelContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pane.default, {
        initialSize: "15%",
        children: children[0]
      }), !showLeftPanelContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pane.default, {
        initialSize: "0px"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pane.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_vModEditor.default, {
          title: title,
          startingCode: startingCode,
          isDarkTheme: isDarkTheme
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pane.default, {
        initialSize: "25%",
        children: children[1]
      })]
    }), !showLeftPanelContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.Button, {
      size: "small",
      variant: "contained",
      onClick: function onClick() {
        return changeLeftPanel([10]);
      },
      classes: {
        root: classes.expandLeftButton
      },
      children: ">"
    })]
  });
}

EditorView.propTypes = {
  startingCode: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired,
  children: _propTypes.default.arrayOf(_propTypes.default.node).isRequired,
  isDarkTheme: _propTypes.default.bool
};
EditorView.defaultProps = {
  isDarkTheme: false
};
var _default = EditorView;
exports.default = _default;

//# sourceMappingURL=editorView.jsx.map