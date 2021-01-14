"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _library = _interopRequireDefault(require("./library-1-13"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vars = {}; // var USER_NAME = 'testUser'
// var PROJECT_NAME = 'testProjectName'
// var PROJECT_TAG = 'vMod-' + PROJECT_NAME

var AEC_DATATAGS = "NoGravity:1b,Duration:2147483647,";
var AEC_ENTITY = "minecraft:area_effect_cloud";

vars.initialize = function (mod) {
  // USER_NAME = user
  // //PROJECT_NAME = project
  // PROJECT_TAG = projectTag
  vars.mod = mod;
};

vars.Declared = /*#__PURE__*/function () {
  function _class(varName, funcName, depth, path, line, column, _isParam) {
    var isDefined = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    _classCallCheck(this, _class);

    this.varName = varName;
    this.functionName = funcName;
    this.depth = depth;
    this.functionPath = path;
    this.lineNum = line;
    this.columnNum = column;
    this.isParam = _isParam;
    this.defined = isDefined;
  }

  return _class;
}(); // change this garbage to JSON objects at some point


vars.Variable = /*#__PURE__*/function (_vars$Declared) {
  _inherits(_class2, _vars$Declared);

  var _super = _createSuper(_class2);

  // needs constructor, hasAction, and scope
  // possibly replace with UUID retrival at some point?
  function _class2(declarator, variableType, mcFunctionContents) {
    var _this;

    _classCallCheck(this, _class2);

    _this = _super.call.apply(_super, [this].concat(_toConsumableArray(Object.values(declarator))));
    _this.defined = true; // this.varName = declarator.varName
    // this tag stuff should be replaced with UUID referencing at some point

    _this.scopeID = "var-".concat(declarator.varName, "-line-").concat(declarator.lineNum, "-column-").concat(declarator.columnNum);
    var pathTemp = declarator.functionPath;
    _this.blockScope = "".concat(pathTemp.replace(/[:|/]/g, "."), "-depth-").concat(declarator.depth);
    _this.entityType = AEC_ENTITY; // is overwritten in classes like Drone if a different entity is desired

    _this.variableType = variableType;

    if (variableType == "team") {
      _this.reference = _this.varName;
      _this.selectorType = "team";
    } else {
      _this.selectorType = "tag";
      _this.reference = "".concat(vars.mod.TAG, "-").concat(_this.scopeID);
    }

    if (declarator.defined) {
      mcFunctionContents.push(_this.clearReference());
    }

    return _this;
  }

  _createClass(_class2, [{
    key: "getVariable",
    value: function getVariable() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // may be able to remove this line once teams are working smoothly
      // many commands require a single entity
      var optionalLimiter = this.variableType == "drone" || limit ? ",limit=1" : "";
      return "@e[".concat(this.selectorType, "=").concat(this.reference).concat(optionalLimiter, "]");
    }
  }]);

  return _class2;
}(vars.Declared);

vars.Drone = /*#__PURE__*/function (_vars$Variable) {
  _inherits(_class3, _vars$Variable);

  var _super2 = _createSuper(_class3);

  function _class3(entityType, declarator, mcFunctionContents) {
    var _this2;

    _classCallCheck(this, _class3);

    vars.mod.addDependency("drone-summon");
    _this2 = _super2.call(this, declarator, "drone", mcFunctionContents);

    if (!entityType) {
      _this2.entityType = AEC_ENTITY;
    } // add the new rotation stuff


    _this2.droneName = _this2.varName;
    _this2.canExecuteCommands = true;
    _this2.isUserConstructed = true;
    return _this2;
  }

  _createClass(_class3, [{
    key: "action",
    value: function action(commandToBeRun) {
      var selector = "@e[tag=".concat(this.reference, "]");
      return _library.default.executeShort(selector, commandToBeRun);
    }
  }, {
    key: "clearReference",
    value: function clearReference() {
      return "kill @e[".concat(this.selectorType, "=").concat(this.reference, "]");
    } // repetitive, keep DRY when properly refactored

  }, {
    key: "createInGameVariable",
    value: function createInGameVariable() {
      var entityName = "".concat(this.variableType, "-").concat(this.varName);
      var dataTags = "{CustomName:\"\\\"".concat(entityName, "\\\"\",").concat(AEC_DATATAGS, "Tags:[\"").concat(vars.mod.TAG, "\",\"").concat(this.blockScope, "\",\"").concat(this.reference, "\",\"VanillaMod-newDroneReferencer\"]}"); // console.log('getting args for ', entityName)

      return ["summon ".concat(this.entityType, " ~ ~ ~ ").concat(dataTags), "function vanillamod-library:drone-summon"];
    }
  }, {
    key: "prettyJSON",
    value: function prettyJSON() {
      return "{\"selector\":\"".concat(this.getVariable(), "\"}");
    }
  }]);

  return _class3;
}(vars.Variable);

vars.Team = /*#__PURE__*/function (_vars$Variable2) {
  _inherits(_class4, _vars$Variable2);

  var _super3 = _createSuper(_class4);

  function _class4(displayName, declarator, mcFunctionContents) {
    var _this3;

    _classCallCheck(this, _class4);

    _this3 = _super3.call(this, declarator, "team", mcFunctionContents);
    _this3.displayName = displayName;
    _this3.canExecuteCommands = true;
    _this3.isUserConstructed = true;
    return _this3;
  }

  _createClass(_class4, [{
    key: "action",
    value: function action(functionName, args) {
      // should I be doing the checking (hasAction) in here?
      var selector = "@e[team=".concat(this.reference, "]");
      return _library.default.executeShort(selector, [functionName].concat(args));
    }
  }, {
    key: "clearReference",
    value: function clearReference() {
      return "team remove ".concat(this.varName);
    } // createTeam

  }, {
    key: "createInGameVariable",
    value: function createInGameVariable() {
      return "team add ".concat(this.varName, " ").concat(this.displayName);
    }
  }, {
    key: "prettyJSON",
    value: function prettyJSON() {
      return "{\"selector\":\"".concat(this.getVariable(), "\"}");
    }
  }]);

  return _class4;
}(vars.Variable);

vars.Integer = /*#__PURE__*/function (_vars$Variable3) {
  _inherits(_class5, _vars$Variable3);

  var _super4 = _createSuper(_class5);

  function _class5(declarator, mcFunctionContents) {
    _classCallCheck(this, _class5);

    return _super4.call(this, declarator, "int", mcFunctionContents);
  }

  _createClass(_class5, [{
    key: "clearReference",
    value: function clearReference() {
      return "kill ".concat(this.getVariable());
    }
  }, {
    key: "createInGameVariable",
    value: function createInGameVariable() {
      var entityName = "".concat(this.variableType, "-").concat(this.varName);
      var dataTags = "{CustomName:\"\\\"".concat(entityName, "\\\"\",").concat(AEC_DATATAGS, "Tags:[\"").concat(vars.mod.TAG, "\",\"").concat(this.blockScope, "\",\"").concat(this.reference, "\"]}"); // console.log('getting args for ', entityName)

      return "summon ".concat(this.entityType, " ~ ~ ~ ").concat(dataTags);
    }
  }, {
    key: "prettyJSON",
    value: function prettyJSON() {
      return "{\"score\":{\"name\":\"".concat(this.getVariable(), "\",\"objective\":\"vMod_Variable\"}}");
    }
  }]);

  return _class5;
}(vars.Variable);

vars.Function = /*#__PURE__*/function () {
  function _class6(name, params) {
    _classCallCheck(this, _class6);

    // ['vMod-'+mod.NAME+'-'+newFunctionName, mod.TAG]
    this.defined = true;
    this.functionName = name;
    this.tag = "".concat(vars.mod.TAG, "-").concat(this.functionName); // this.tags = tags

    this.variableType = "Function";
    this.entityType = AEC_ENTITY; // rotate on summon so facing same as player? (for drone left/right)
  }

  _createClass(_class6, [{
    key: "getSelector",
    value: function getSelector() {
      return "@e[tag=".concat(this.tag, ",limit=1]");
    }
  }, {
    key: "createInGameVariable",
    value: function createInGameVariable() {
      var entityName = "".concat(this.variableType, "-").concat(this.functionName);
      var dataTags = "{CustomName:\"\\\"".concat(entityName, "\\\"\",").concat(AEC_DATATAGS, "Tags:[\"").concat(vars.mod.TAG, "\",\"").concat(this.tag, "\"]}"); // console.log('getting args for ', entityName)

      return "summon ".concat(this.entityType, " ~ ~ ~ ").concat(dataTags);
    }
  }, {
    key: "prettyJSON",
    value: function prettyJSON() {
      return "\"".concat(this.functionName, " has a last success of: \",{\"score\":{\"name\":\"").concat(this.getSelector(), "\",\"objective\":\"vMod_LastSuccess\"}}");
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "createClickableFunctionChatJSON",
    value: function createClickableFunctionChatJSON(mod, functionName) {
      var runFunction = _library.default.function(getMCFunctionPath(mod, functionName, "run")).join(" ");

      var tellrawJSON = "[\"\",{\"text\":\"".concat(mod.initFunctionsList.length + 1, ": \",\"bold\":true},{\"text\":\"").concat(functionName, "\",\"color\":\"blue\",\"underlined\":true,") + "\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/".concat(runFunction, "\"},\"hoverEvent\":{\"action\":\"show_text\",\"value\":") + "{\"text\":\"\",\"extra\":[{\"text\":\"Click me to run the function /".concat(runFunction, " from ").concat(mod.NAME, "\"},") + "{\"text\":\"\\nShift click to get command in chat for copying\"}]}},\"insertion\":\"/".concat(runFunction, "\",\"bold\":false},") + '{"text":" --- ","bold":true},{"text":" Get command block.","color":"blue","underlined":true,' + '"clickEvent":{"action":"run_command","value":"/give @p command_block' + "{display:{Name:\\\"Runs: ".concat(functionName, "\\\",Lore:[\\\"From the VanillaMod: ").concat(mod.NAME, "\\\"]},BlockEntityTag:{Command:\\\"").concat(runFunction, "\\\"}}\"},") + '"hoverEvent":{"action":"show_text","value":' + "{\"text\":\"\",\"extra\":[{\"text\":\"Click me to get a command block that runs ".concat(functionName, "\"}]}}}]");
      return tellrawJSON;
    }
  }]);

  return _class6;
}();

function getMCFunctionPath(mod, calledFunction, mcFunctionName) {
  return "".concat(mod.NAME, ":").concat(calledFunction, "/").concat(mcFunctionName);
}

var _default = vars;
exports.default = _default;

//# sourceMappingURL=variables.js.map