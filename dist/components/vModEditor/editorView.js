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
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: editorViewRef
  }, /*#__PURE__*/_react.default.createElement(_reactSplitPane.default, {
    split: "vertical",
    onResizeEnd: changeLeftPanel
  }, showLeftPanelContent && /*#__PURE__*/_react.default.createElement(_Pane.default, {
    initialSize: "15%"
  }, children[0]), !showLeftPanelContent && /*#__PURE__*/_react.default.createElement(_Pane.default, {
    initialSize: "0px"
  }), /*#__PURE__*/_react.default.createElement(_Pane.default, null, /*#__PURE__*/_react.default.createElement(_vModEditor.default, {
    title: title,
    startingCode: startingCode
  })), /*#__PURE__*/_react.default.createElement(_Pane.default, {
    initialSize: "25%"
  }, children[1])), !showLeftPanelContent && /*#__PURE__*/_react.default.createElement(_core.Button, {
    size: "small",
    variant: "contained",
    onClick: function onClick() {
      return changeLeftPanel([10]);
    },
    classes: {
      root: classes.expandLeftButton
    }
  }, ">"));
}

EditorView.propTypes = {
  startingCode: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired,
  children: _propTypes.default.arrayOf(_propTypes.default.node).isRequired
};
var _default = EditorView;
exports.default = _default;

//# sourceMappingURL=editorView.jsx.map