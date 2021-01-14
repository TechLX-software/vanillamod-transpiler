"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commands = _interopRequireDefault(require("./resources/1-13-commands.json"));

var _library = _interopRequireDefault(require("./library-1-13"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var validator = {};
var commandValidator = _commands.default.children;

var VModError = /*#__PURE__*/function (_Error) {
  _inherits(VModError, _Error);

  var _super = _createSuper(VModError);

  function VModError(location, message) {
    var _this;

    _classCallCheck(this, VModError);

    var wrappedMessage = message.trim().replace(new RegExp("(?![^\\n]{1,".concat(100, "}$)([^\\n]{1,", 100, "})\\s"), "g"), "$1\n");
    _this = _super.call(this, wrappedMessage);
    _this.location = location;
    return _this;
  }

  return VModError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

validator.validate = function (statement, inGameVars) {
  debugPrint("================================================ validate() ================================================"); // const minecraftCommand = command[0];

  var command = [];

  function init() {
    debugPrint("--------------- setup() --------------");
    debugPrint(statement); // <<<<<<< HEAD
    //     let propertyName = statement.callee.property.name;
    //     let objectName = statement.callee.object.name;
    //     if (objectName == 'mc') {
    //       console.log(statement.arguments);
    //       return checkCommand(commandValidator, [propertyName, ...statement.arguments])
    //       // return checkCommand(commandValidator, validator.command = [propertyName, ...statement.arguments])
    //     } else if (objectName == 'vMod') {
    //       command = statement.arguments;
    //       if(propertyName == 'command') {
    //         return {
    //           valid: true
    //         }
    //       }
    //       // if(propertyName == 'command') {
    //       //   if(statement.arguments.length == 1) {
    //       //     return checkCommand(commandValidator, statement.arguments[0].value.split(' '))
    //       //   } else
    //       //     return {
    //       //       valid: false,
    //       //       error: `Too many arguments, vMod.command requires 1 argument. ${statement.arguments.length} were passed`
    //       //     }
    //       // } else {
    //       //   return {
    //       //     valid: false,
    //       //     error: ''
    //       //   }
    //       // }
    // =======

    validator.command = [];
    var propertyName = statement.callee.property.name;
    var objectName = statement.callee.object.name;

    if (objectName === "vMod") {
      if (_library.default[propertyName] && typeof _library.default[propertyName] === "function") {
        if (propertyName === "command") {
          if (statement.arguments[0] && statement.arguments[0].type == "Literal") {
            return _library.default.command(statement.arguments[0].value);
          }

          throw new VModError(statement.loc, "vMod.command() should only have a single string as an argument");
        }

        return checkCommand(commandValidator, _library.default[propertyName].apply(_library.default, _toConsumableArray(statement.arguments)));
      }

      throw new VModError(statement.callee.property.loc, "The vMod library does not contain the function: " + "'".concat(statement.callee.property.name, "', if it's a vanilla minecraft command use mc. otherwise check your spelling"));
    } else if (objectName == "mc") {
      if (commandValidator[propertyName]) {
        return checkCommand(commandValidator, [propertyName].concat(_toConsumableArray(statement.arguments)));
      }

      throw new VModError(statement.callee.property.loc, "There is no vanilla minecraft command for: " + "'".concat(statement.callee.property.name, "', if it's a custom vanillamod function use vMod. otherwise check your spelling"));
    } else if (inGameVars.has(objectName)) {
      var object = inGameVars.get(objectName);

      if (object.defined) {
        if (object.canExecuteCommands) {
          // const commandToBeRun = validator(restOfCallExpressionJSON)
          // const variableAction = object.action(commandToBeRun)
          // return variableAction
          var args = statement.arguments;
          var func = _library.default[propertyName]; // check to see if action is a vanillamod custom

          if (func && typeof func === "function") {
            if (args.length == func.length) {
              for (var i = 0; i < args.length; i++) {
                args[i] = parseArg(args[i]);
                if (!args[i].valid) return args[i];
                args[i] = args[i].argument;
              }

              return checkCommand(commandValidator, object.action(func.apply(void 0, _toConsumableArray(args))));
            }

            throw new VModError(statement.loc, "Function \"".concat(propertyName, "()\" requires ").concat(func.length, " parameters. ").concat(args.length, " arguments were passed"));
          } else {
            // action is a default minecraft command
            return checkCommand(commandValidator, object.action([propertyName].concat(_toConsumableArray(args))));
          } // } else {
          //   return {
          //       valid: false,
          //       error: `${propertyName} is not a predefined function/property for object "${objectName}", options include: ${Object.keys(vMod)} (some functions in this list are not valid including: escapeQuotes, spaceCleaner, doEscaping, etc.)`
          //     }
          // }
          // return checkCommand(commandValidator, validator.command = vMod.executeShort(objectName, [propertyName, ...statement.arguments]))

        } else {
          throw new VModError(statement.callee.property.loc || statement.loc, "The function: ".concat(propertyName, " does not exist for object: ").concat(objectName)); // return {
          //   valid: false,
          //   location: statement.callee.property.loc || statement.loc || 'unknown',
          //   error:
          // }
          // addError(statement.loc, 'The function: ' + calledFunctionName + ' does not exist for object: ' + objectName);
        }
      } else {
        throw new VModError(statement.callee.object.loc || statement.loc, "The variable \"".concat(objectName, "\" exists but is undefined. Make sure you set the variable equal to something."));
      }
    } else {
      throw new VModError(statement.callee.object.loc || statement.loc, "There is no variable with the name \"".concat(objectName, "\" Check to see if it is mispelled or out of scope."));
    }
  }

  var obj = _objectSpread({}, init(), {
    command: command
  });

  if (obj.valid) {
    return obj;
  }

  throw new VModError(obj.location, "VanillaMod Source Error - Could not validate \"".concat(statement.callee.object.name, ".").concat(statement.callee.property.name, "\"") + "\nPlease share your code in our discord so we can fix this bug!"); // return checkCommand(commandValidator, statement.callee.object.name == 'vMod' ? statement.arguments : vMod.executeShort(statement.callee.object.name, statement.arguments))
  // return checkCommand(commandValidator[command].hasOwnProperty('children') ? commandValidator[command].children : commandValidator[commandValidator[command].redirect[0]].children, statement.arguments)

  /**
   * Checks if argument is valid, then parses it
   *
   * @Param: <argument> argument to be parsed
   * @Return: returns object with properties <valid> whether or not argument is valid, <error> error message if arguement is not valid, and <arguement> parsed argument if valid
   */

  function parseArg(argument) {
    var parsedArg = "";

    if (_typeof(argument) === "object") {
      if (argument.type == "Identifier") {
        if (inGameVars.has(argument.name)) {
          var argVar = inGameVars.get(argument.name);

          if (argVar.varName && argVar.defined) {
            parsedArg = argVar.getVariable();
          } else {
            throw new VModError(argument.loc || statement.loc, "Tried to add following var as param and failed: ".concat(argVar, ". Maybe it is undefined?"));
          }
        } else {
          throw new VModError(argument.loc || statement.loc, "The variable ".concat(argument.name, " does not exist. Check to see if it is mispelled or out of scope."));
        }
      } else if (argument.type == "Literal") {
        if (typeof argument.value === "string") {
          parsedArg = argument.value.trim();
        } else {
          parsedArg = argument.value;
        } // fix negative number for UnaryExpression

      } else if (argument.type == "TemplateLiteral") {
        parsedArg = argument.quasis[0].value.cooked;
      } else {
        throw new VModError(argument.loc || statement.loc, "Invalid argument type. ".concat(argument.type, " cannot be used as an argument of this function.") + "\nUse strings, numbers, and variables only");
      }
    } else {
      parsedArg = argument;
    }

    return {
      valid: true,
      argument: parsedArg
    };
  }
  /**
   * Checks Commands for its ability to execute
   *
   * @Param: <currentProperty> contains the remaining posibilities in the command in an object, <remainingArgs> contains the remaining unprocessed arguments in an array
   * @Return: returns object that contains valid boolean and error message
   */


  function checkCommand(currentProperty, remainingArgs) {
    debugPrint("----------------------------- checkCommand() -----------------------------");
    debugPrint("remainingArgs: ".concat(remainingArgs));
    debugPrint(currentProperty); // list of properties in current object

    var keys = Object.keys(currentProperty);
    var argument = remainingArgs[0];
    var parsedArg = parseArg(argument);
    if (!parsedArg.valid) return parsedArg;
    parsedArg = parsedArg.argument;
    command.push(parsedArg); // if current objects properties are of type "literal" or type "argument" by checking the first property (assuming that all properties are of the same type)

    if (currentProperty[keys[0]].type == "literal") {
      // Checks for valid argument
      if (parsedArg in currentProperty) {
        debugPrint("remainingArgs[0] in currentProperty");
        return checkLastArg(parsedArg);
      }

      var options = "";
      debugPrint("keys", keys);

      var _iterator = _createForOfIteratorHelper(keys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          options += " \"".concat(key, "\"");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      throw new VModError(argument.loc || statement.loc, "Invalid Argument: \"".concat(parsedArg, "\" is not a valid argument in this command.") + "\nTry one of these instead:".concat(options));
    } else if (currentProperty[keys[0]].type == "argument") {
      debugPrint("argument");
      debugPrint("keys.length > 1: ".concat(keys.length > 1, ", keys: [").concat(keys, "]")); // Checks if there is more that one property in current object

      if (keys.length > 1) {
        if (remainingArgs.length > 1) {
          // Checks all properties in current object for children
          var _iterator2 = _createForOfIteratorHelper(keys),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _key = _step2.value;

              if ("children" in currentProperty[_key]) {
                // don't bother with depth-first to check each child option, there's only ever one that matters.
                return checkCommand(currentProperty[_key].children, remainingArgs.slice(1));
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          throw new VModError(remainingArgs[1].loc.start && remainingArgs[remainingArgs.length - 1].loc.end ? {
            start: remainingArgs[1].loc.start,
            end: remainingArgs[remainingArgs.length - 1].loc.end
          } : statement.loc, "Command not valid, Too many arguments " + "(".concat(currentProperty[parsedArg].executable ? "Command is executable" : "Command is not executable", ")"));
        } else {
          debugPrint("remainingArgs.length is less than 1"); // Checks if any properties in current object are executable

          var _iterator3 = _createForOfIteratorHelper(keys),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _key2 = _step3.value;

              if (currentProperty[_key2].executable) {
                return {
                  valid: true,
                  error: "none"
                };
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          throw new VModError(argument.loc || statement.loc, "Command is not executable, not enough arguments. Check the documentation to see what you missed.");
        }
      } else {
        return checkLastArg(keys[0]);
      }
    } else {
      throw new VModError(argument.loc || statement.loc, "\"".concat(currentProperty[keys[0]].type, "\" is not a \"literal\" or \"argument\",") + "Check the documentation to see what you missed");
    }
    /**
     * Created to reduce redundancy, checks for last argument and executes appropriately
     *
     * @Param <key> describes the key of the target property of the current object
     */


    function checkLastArg(key) {
      debugPrint("----------------------------- checkLastArg() -----------------------------");
      var currentPropKey = currentProperty[key];
      debugPrint("Arguements left to process: ".concat(remainingArgs.length));

      if (remainingArgs.length > 1) {
        debugPrint("Current Property has children: ".concat("children" in currentPropKey));

        if ("children" in currentPropKey) {
          return checkCommand(currentPropKey.children, remainingArgs.slice(1));
        }

        if ("redirect" in currentPropKey) {
          debugPrint("redirect");
          return checkCommand(commandValidator[currentPropKey.redirect[0]].children, remainingArgs.slice(1));
        }

        if (argument == "run") {
          return checkCommand(commandValidator, remainingArgs.slice(1));
        }

        throw new VModError(remainingArgs[1].loc.start && remainingArgs[remainingArgs.length - 1].loc.end ? {
          start: remainingArgs[1].loc.start,
          end: remainingArgs[remainingArgs.length - 1].loc.end
        } : statement.loc, "Command not valid, Too many arguments (".concat(currentPropKey.executable ? "Command is executable" : "Command is not executable", ")"));
      } else {
        var valid = currentPropKey.executable;
        debugPrint("valid: ".concat(valid));

        if (valid) {
          return {
            valid: true,
            error: "none"
          };
        }

        throw new VModError(statement.loc, "Command is not executable, not enough arguments");
      }
    }
  }
};

function debugPrint() {
  if (process.env.ENVIRONMENT == "dev") {
    console.log.apply(console, arguments);
  }
}

var _default = validator;
exports.default = _default;

//# sourceMappingURL=validator.js.map