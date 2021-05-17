"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _esprima = require("esprima");

var _library = _interopRequireDefault(require("./library-1-13"));

var _variables = _interopRequireDefault(require("./variables"));

var _validator = _interopRequireDefault(require("./validator"));

var _vModMCFLibrary = _interopRequireDefault(require("./resources/vMod-MCF-library.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var transpiler = {};
var STORE_VARIABLE_OBJECTIVE = "vMod_Variable";

var INIT_HELPER_ARRAY = function INIT_HELPER_ARRAY(selector) {
  return ["scoreboard objectives add vMod_LastSuccess dummy", "scoreboard players set ".concat(selector, " vMod_LastSuccess 0"), "scoreboard objectives add ".concat(STORE_VARIABLE_OBJECTIVE, " dummy")];
};

var LAST_SUCCESS_TRUE = function LAST_SUCCESS_TRUE() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return "@s[".concat(selector, "scores={vMod_LastSuccess=1..}]");
}; // const LAST_SUCCESS_FALSE = (selector = "") =>
//   `@s[${selector}scores={vMod_LastSuccess=..0}]`;


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

function jsonFile(fileName, fileType) {
  var fileContents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!/[a-z0-9_.-]/.test(fileName)) {
    throw new VModError("VanillaMod Source Code (sort of)", "The file name ".concat(fileName, " contains a non [a-z0-9_.-] character (Uppercase is not allowed)"));
  }

  return {
    name: fileName,
    type: fileType,
    contents: fileContents
  };
}

function newJsonFile(directory, fileName, fileType) {
  var fileContents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var file = jsonFile(fileName, fileType, fileContents);
  directory.contents.push(file);
  return file;
}

function getFileContentsByName(fileName, currentFolder) {
  var folderArray = currentFolder.contents ? currentFolder.contents : currentFolder;
  var folder = folderArray.find(function (file) {
    return file.name === fileName;
  });

  if (folder) {
    return folder.contents ? folder.contents : undefined;
  }

  return undefined;
}

function getFileByName(fileName, currentFolder) {
  var folderArray = currentFolder.contents ? currentFolder.contents : currentFolder;
  var folder = folderArray.find(function (file) {
    return file.name === fileName;
  });
  return folder;
} // https://www.reddit.com/r/Minecraft/comments/3xx4xz/modern_scientific_calculator/


transpiler.compile = function (rawJavaScript, modInfo) {
  debugPrint("modInfo:", modInfo);
  var parsedJS;

  try {
    parsedJS = (0, _esprima.parseScript)(rawJavaScript, {
      loc: true
    });
  } catch (e) {
    var location = {
      esprima: true,
      line: e.lineNumber,
      col: e.column,
      index: e.index
    };
    return {
      errors: [new VModError(location, e.description)]
    };
  }

  var snakeCaseModName = snakeCaser(modInfo.modName);
  var mod = {
    objectives: [],
    initFunctionsList: [],
    OWNER_NAME: "USER_NAME_HERE",
    NAME: snakeCaseModName,
    TAG: "vMod-".concat(snakeCaseModName),
    dependencies: [],
    addDependency: function addDependency(dependencyName) {
      if (!this.dependencies.includes(dependencyName)) {
        this.dependencies.push(dependencyName);
      }
    },
    errors: [],
    datapackJson: {
      modName: snakeCaseModName,
      mcmeta: {
        pack: {
          pack_format: 6,
          description: "A VanillaMod by ".concat("USER_NAME_HERE", ". Last updated on ", new Date().toLocaleString())
        }
      },
      data: jsonFile("data", "folder", [jsonFile(snakeCaseModName, "folder", [jsonFile("functions", "folder")]), jsonFile("minecraft", "folder", [jsonFile("tags", "folder", [jsonFile("functions", "folder", [jsonFile("load", "json", {
        values: ["".concat(snakeCaseModName, ":init")]
      })])])])])
    }
  }; // vMod.spigotPrefix(modInfo.spigot);

  _variables.default.initialize(mod); // this try catch might be worth implementing once we're client-side?
  // try {


  transpiler.transpileProgramStatement(parsedJS, mod); // } catch (e) {
  //   debugPrint('Caught unhandled transpiler error: ', JSON.stringify(e));
  //   return ['Unhandled transpiler error:\n' + JSON.stringify(e)];
  // } //redundant redundancies

  if (mod.errors.length > 0) {
    debugPrint("errors found by vMod: ", mod.errors);
    return {
      errors: mod.errors
    };
  } // add dependencies:


  if (mod.dependencies.length > 0) {
    var vanillaModMCF_library = jsonFile("functions", "folder");
    var libraryContents = vanillaModMCF_library.contents;
    mod.dependencies.forEach(function (dependency) {
      var dependencyMCFunctionContents = _vModMCFLibrary.default[dependency];
      libraryContents.push(dependencyMCFunctionContents);
    });
    mod.datapackJson.data.contents.push(jsonFile("vanillamod-library", "folder", [vanillaModMCF_library]));
  }

  debugPrint("datapack JSON:", mod.datapackJson);
  return mod.datapackJson;
};

transpiler.transpileProgramStatement = function (programStatement, mod) {
  debugPrint("datapack JSON at start:", mod.datapackJson);
  var functionsFolder = getFileByName("functions", mod.datapackJson.data.contents[0]); // walk down to the functions folder from the namespace of this mod

  var scope = {
    functionName: "vMod-GLOBAL",
    mcFunctionName: "main",
    statementContext: "program",
    depth: 0,
    index: 0,
    variables: new Map(),
    variableCounter: 0,
    datapackFolder: functionsFolder,
    // folderContents: functionsFolder.contents,
    mcFunctionPath: "".concat(mod.NAME, ":"),
    mcFunctionContents: [] // getFileContentsByName(scope.mcFunctionName, datapackFolder)

  };
  debugPrint("".concat(indenter(scope.depth) + scope.depth, ":").concat(scope.index, " program statement ["));
  var modInit;
  var modInitMain;

  try {
    // assign easily accessible vars to and create mcfunctions
    modInit = newJsonFile(scope.datapackFolder, "init", "mcfunction").contents;
    modInitMain = newJsonFile(scope.datapackFolder, scope.mcFunctionName, "mcfunction", INIT_HELPER_ARRAY("@s")).contents;
    scope.mcFunctionContents = modInitMain; // vars. NEEDS FIX with new JSON variables

    var thisMod = new _variables.default.Function(mod.NAME, null); // add commands to remove scoreboard objectives.

    var clearThisModEntities = "kill @e[tag=".concat(mod.TAG, "]");
    modInit.push(clearThisModEntities); // add commands to init

    modInit.push(thisMod.createInGameVariable());
    modInit.push("function ".concat(scope.mcFunctionPath, "main"));
    modInit.push("kill ".concat(thisMod.getSelector()));
  } catch (e) {
    mod.errors.push(e);
  } // get all functions in an array


  var esprimaFunctions = programStatement.body.filter(function (nextStatement) {
    return nextStatement.type === "FunctionDeclaration";
  }); // do function initialize loop. This is a setup step and also hoists the functions above everything else.

  esprimaFunctions.forEach(function (functionStatement) {
    try {
      transpiler.initializeFunction(functionStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  }); // hoist variable declarations.

  var variableDeclarationsToHoist = programStatement.body.filter(function (nextStatement) {
    return nextStatement.type === "VariableDeclaration";
  });
  variableDeclarationsToHoist.forEach(function (variableStatement) {
    try {
      transpiler.transpileVariableDeclaration(variableStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  }); // Do preloop for everything else in global scope.

  var hoistedStatements = [].concat(_toConsumableArray(esprimaFunctions), _toConsumableArray(variableDeclarationsToHoist));
  var nonHoistedStatements = programStatement.body.filter(function (nextStatement) {
    return !hoistedStatements.includes(nextStatement);
  });
  nonHoistedStatements.forEach(function (initStatement) {
    try {
      // console.log(`Doing a thing in global scope that is not hoisted but coming first because it's not in a function: ${initStatement.type}`)
      if (transpiler.hasOwnProperty("transpile".concat(initStatement.type))) {
        transpiler["transpile".concat(initStatement.type)](initStatement, mod, scope);
      } else {
        throw new VModError(initStatement.loc, "InvalidType. VanillaMod does not currently support ".concat(initStatement.type));
      }
    } catch (e) {
      mod.errors.push(e);
    }
  });
  esprimaFunctions.forEach(function (functionStatement) {
    // debugPrint('in statement with statement type:', statement.type);
    try {
      transpiler.transpileFunctionDeclaration(functionStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  });
  debugPrint("] - end program");

  try {
    var _modInitMain;

    mod.objectives.forEach(function (objectiveName) {
      var removeObjective = "scoreboard objectives remove ".concat(objectiveName);
      modInit.unshift(removeObjective);
    });
    modInitMain.push("say ".concat(mod.NAME, " has been initialized, feel free to run functions:"));
    debugPrint("init functions", mod.initFunctionsList);

    (_modInitMain = modInitMain).push.apply(_modInitMain, _toConsumableArray(mod.initFunctionsList));
  } catch (e) {
    mod.errors.push(e);
  }
};

transpiler.initializeFunction = function (statement, mod, scope) {
  var newFunctionName = snakeCaser(statement.id.name);

  if (!/[a-z0-9_.-]/.test(newFunctionName)) {
    throw new VModError(statement.id.loc, "The file name ".concat(newFunctionName, " contains a non [a-z0-9_.-] character. ") + "It should only have lowercase letters, numbers, periods, underscores, or hyphens");
  }

  if (scope.variables.has(newFunctionName)) {
    throw new VModError(statement.id.loc, "There is already a function called ".concat(newFunctionName, ". ") + "Function names must be unique, ignoring uppercase and lowercase.");
  }

  scope.variables.set(newFunctionName, new _variables.default.Function(newFunctionName, statement.params));
  var runFunctionOnClick = scope.variables.get(newFunctionName).createClickableFunctionChatJSON(mod, newFunctionName);
  mod.initFunctionsList.push("tellraw @p ".concat(runFunctionOnClick)); // for each param add an objective, only if another is needed. e.g. statement.params.length > totalParamCount
  // have a method in vars.Function to get the number of params
};

transpiler.transpileFunctionDeclaration = function (statement, mod, scope) {
  var newFunctionName = snakeCaser(statement.id.name);
  var thisFunction = scope.variables.get(newFunctionName);
  scope.functionName = newFunctionName;
  scope.mcFunctionName = "main"; // standardize this maybe?

  scope.mcFunctionPath = "".concat(mod.NAME, ":").concat(scope.functionName); // Create new folder for user-defined JS function

  var functionFolder = newJsonFile(scope.datapackFolder, scope.functionName, "folder"); // go inside the new folder for user-defined function

  scope.statementContext = scope.functionName; // give block statement the path to enter
  // create new main mcfunction

  scope.mcFunctionContents = newJsonFile(functionFolder, "main", "mcfunction").contents; // Create new run mcfunction

  var runFunction = newJsonFile(functionFolder, "run", "mcfunction").contents; // Creates function variable that runs the function. Eventually,
  // the player should be the one that runs the function

  runFunction.push(thisFunction.createInGameVariable());
  runFunction.push.apply(runFunction, _toConsumableArray(INIT_HELPER_ARRAY(thisFunction.getSelector())));
  runFunction.push(_library.default.executeShort(thisFunction.getSelector(), _library.default.function(getMCFunctionPath(mod, scope.functionName, scope.mcFunctionName))).join(" "));
  runFunction.push("kill ".concat(thisFunction.getSelector()));
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " function declaration"));
  transpiler["transpile".concat(statement.body.type)](statement.body, mod, scope); // first see if init stuff works
  // something something parameters
};

transpiler.transpileBlockStatement = function (statement, mod, oldScope) {
  // Creating new scope
  // const unreferencedDatapackFolder = JSON.parse(JSON.stringify(oldScope.datapackFolder))
  var newDatapackFolder = getFileByName(oldScope.statementContext, oldScope.datapackFolder); // debugPrint('Attempted unref:', JSON.stringify(unreferencedDatapackFolder, null, 4))
  // debugPrint('changing old scope')
  // //oldScope.datapackFolder =
  // debugPrint('Attempted unref 2:', JSON.stringify(unreferencedDatapackFolder, null, 4))

  var scope = {
    functionName: oldScope.functionName,
    mcFunctionName: oldScope.mcFunctionName,
    statementContext: oldScope.statementContext,
    depth: oldScope.depth + 1,
    index: 0,
    variables: new Map(oldScope.variables),
    variableCounter: 0,
    datapackFolder: newDatapackFolder,
    // folderContents: newDatapackFolder.contents,
    mcFunctionPath: "".concat(oldScope.mcFunctionPath, "/"),
    mcFunctionContents: [] // getFileContentsByName(scope.mcFunctionName, datapackFolder)

  };
  scope.mcFunctionContents = getFileContentsByName(scope.mcFunctionName, scope.datapackFolder);
  debugPrint("".concat(indenter(scope.depth) + scope.depth, ":").concat(scope.index, " block statement [")); // awesome ingame debug helper:
  // scope.mcFunctionContents.push(`say Now running ${scope.mcFunctionName} from: ${scope.mcFunctionPath}));

  statement.body.forEach(function (bodyStatement) {
    if (typeof transpiler["transpile".concat(bodyStatement.type)] === "function") {
      scope.index++;

      try {
        transpiler["transpile".concat(bodyStatement.type)](bodyStatement, mod, scope);
      } catch (e) {
        mod.errors.push(e);
      }
    }
  });

  if (scope.depth > 0 && scope.variableCounter > 0) {
    var blockScopeTag = "".concat(scope.mcFunctionPath.replace(/[:|/]/g, "."), "depth-").concat(scope.depth);
    var killOldVars = "kill @e[tag=".concat(blockScopeTag, "]");
    scope.mcFunctionContents.push(killOldVars);
  }

  debugPrint("".concat(indenter(scope.depth), "]")); // possible rewrite thought that VariableDeclaration, ExpressionStatement, etc just return an array to push onto main,
  // therefore removing the need to pass them functionPath or JSONfolder.
};

transpiler.transpileVariableDeclaration = function (statement, mod, scope) {
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " variable declaration"));

  if (statement.kind === "const") {
    throw new VModError(statement.loc, "VanillaMod incompatibility, constants are not yet supported");
  }

  statement.declarations.forEach(function (declaration) {
    var varName = declaration.id.name;

    if (!scope.variables.has(varName)) {
      var codeLocation = statement.loc.start;
      var variableBeingDeclared = new _variables.default.Declared(varName, scope.functionName, scope.depth, scope.mcFunctionPath, codeLocation.line, codeLocation.column, false, false);
      scope.variables.set(varName, variableBeingDeclared); // debugPrint('DECLARED: ', varName);
      // var errorLocation = statement.loc.start;
      // debugPrint('Line: ' +errorLocation.line+ ' Column: '+errorLocation.column)

      scope.variableCounter++;
    }

    if (declaration.init) {
      fixIfNegativeNumber(declaration.init);

      if (declaration.init.type === "Literal" && typeof declaration.init.value === "number") {
        var toBeDefined = scope.variables.get(varName);

        if (!toBeDefined.defined) {
          scope.variables.set(varName, new _variables.default.Integer(toBeDefined, scope.mcFunctionContents));
          var newInt = scope.variables.get(varName);
          var summonInteger = newInt.createInGameVariable();
          scope.mcFunctionContents.push(summonInteger);
          var setValue = "scoreboard players set ".concat(newInt.getVariable(), " ").concat(STORE_VARIABLE_OBJECTIVE, " ").concat(declaration.init.value);
          scope.mcFunctionContents.push(setValue);
        } else {
          throw new VModError(declaration.loc, "Do not redeclare variables, ".concat(declaration.id.name, " already exists!"));
        }
      } else if (declaration.init.type === "NewExpression") {
        declaration.init.justDeclared = true;
        transpiler.transpileNewExpression(declaration.init, mod, scope, varName);
      } else {
        throw new VModError(declaration.init.loc, "Variable defininitions should either be a new expression or an integer.");
      }
    }
  });
}; // ZIP SKIPPED


transpiler.transpileIfStatement = function (statement, mod, scope) {
  // handles if, else if, and else all in one ... well, it will
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " if statement"));
  var oldMCFunctionPath = scope.mcFunctionPath;
  var oldMCFunctionContents = scope.mcFunctionContents;
  var oldDatapackFolder = scope.datapackFolder;
  var oldContext = scope.statementContext; // establish proper statement names

  var location = statement.loc.start;
  var statementName = scope.statementContext === "else" ? newStatementSubPath(location.line, "else-if") : newStatementSubPath(location.line, "if");
  var ifStatementMCFunctionPath = oldMCFunctionPath + statementName;
  debugPrint("Statement name:", statementName, "current path:", ifStatementMCFunctionPath); // Create new folder for user-defined if/else statement with main and test

  var ifStatementFolder = newJsonFile(scope.datapackFolder, statementName, "folder");
  var ifStatementMain = newJsonFile(ifStatementFolder, "main", "mcfunction").contents; // REMOVED UNTIL COMPLEX CONDITIONALS ARE IMPLEMENTED
  // const ifStatementTest = newJsonFile(ifStatementFolder, 'test', 'mcfunction').contents

  var ifStatementTestPath = "".concat(ifStatementMCFunctionPath, "/test");

  var checkConditionalCommand = _library.default.function(ifStatementTestPath).join(" ");

  if (["CallExpression", "BinaryExpression"].includes(statement.test.type)) {
    scope.statementContext = oldContext;
    scope.mcFunctionName = oldContext;
    scope.mcFunctionContents = oldMCFunctionContents;

    if (isSimpleBinaryCondition(statement.test)) {
      checkConditionalCommand = transpiler.transpileBinaryExpression(statement.test, mod, scope, true);
    } else if (isSimpleCallExpressionCondition(statement.test)) {
      checkConditionalCommand = transpiler.transpileCallExpression(statement.test, mod, scope, true);
    } else {
      // REMOVED UNTIL COMPLEX CONDITIONALS ARE IMPLEMENTED
      throw new VModError(statement.test.loc, "VanillaMod: The condition used is overly complex. " + "Try a simple comparison like yourVar < 5 or vMod.yourCommand(...)"); // scope.statementContext = 'conditional'
      // scope.mcFunctionContents = ifStatementTest
      // scope.mcFunctionPath = ifStatementTestPath
      // transpiler['transpile' + statement.test.type](statement.test, mod, scope)
    }
  } else {
    throw new VModError(statement.test.loc, "VanillaMod: IncompatibleStatementType. " + "The type ".concat(statement.test.type, " cannot be used as a condition/boolean"));
  } // Add continue tag if needed


  var continueTag = "vMod-ElseContinue-".concat(scope.functionName, "-depth-").concat(scope.depth);
  var testDoLoop = "";

  if (oldContext === "else") {
    testDoLoop = "execute if entity @s[tag=".concat(continueTag, "] run ").concat(checkConditionalCommand);
  } else {
    if (statement.alternate) {
      oldMCFunctionContents.push("tag @s add ".concat(continueTag));
    }

    testDoLoop = checkConditionalCommand;
  }

  oldMCFunctionContents.push(testDoLoop); // Add continueTag check where needed to run the inside of else-if

  var conditionalBody = "";

  if (oldContext === "else") {
    conditionalBody = "execute if entity ".concat(LAST_SUCCESS_TRUE("tag=".concat(continueTag, ",")), " run ").concat(_library.default.function("".concat(ifStatementMCFunctionPath, "/main")).join(" "));
  } else {
    conditionalBody = "execute if entity ".concat(LAST_SUCCESS_TRUE(), " run ").concat(_library.default.function("".concat(ifStatementMCFunctionPath, "/main")).join(" "));
  }

  oldMCFunctionContents.push(conditionalBody); // Remove continue tag if the statement has an 'else'

  if (statement.alternate) {
    ifStatementMain.push("tag @s remove ".concat(continueTag));
  }

  scope.statementContext = statementName;
  scope.mcFunctionContents = ifStatementMain;
  debugPrint("Concat path: oldMCPath:", oldMCFunctionPath, "statement name", statementName);
  scope.mcFunctionPath = oldMCFunctionPath + statementName;
  scope.mcFunctionName = "main"; // newJSONfolder['main'].push(`tag @s remove ${continueTag}`);

  transpiler["transpile".concat(statement.consequent.type)](statement.consequent, mod, scope); // 1.13 IF STATEMENT WILL NOT WORK UNTIL THIS IS FIXED

  if (statement.alternate) {
    // move back into upper datapack folder to avoid nesting
    scope.datapackFolder = oldDatapackFolder;
    scope.mcFunctionContents = oldMCFunctionContents;
    scope.index++;

    if (statement.alternate.type === "IfStatement") {
      scope.statementContext = "else";
      scope.mcFunctionPath = oldMCFunctionPath;
      transpiler.transpileIfStatement(statement.alternate, mod, scope);
    } else {
      debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " else statement"));
      var elseLocation = statement.alternate.loc.start;
      var elseFolderName = newStatementSubPath(elseLocation.line, "else");
      scope.statementContext = elseFolderName; // move back into upper datapack folder to avoid nesting

      var elseFolder = newJsonFile(scope.datapackFolder, elseFolderName, "folder");
      var elseMain = newJsonFile(elseFolder, "main", "mcfunction"); // Adjust scope to new folder, making sure to avoid nesting

      scope.mcFunctionContents = elseMain.contents;
      scope.mcFunctionPath = oldMCFunctionPath + elseFolderName;
      scope.mcFunctionName = "main"; // add command to do the 'else' (the if check failed)

      var alternate = "execute if entity @s[tag=".concat(continueTag, "] run ").concat(_library.default.function("".concat(scope.mcFunctionPath, "/main")).join(" "));
      oldMCFunctionContents.push(alternate);
      transpiler["transpile".concat(statement.alternate.type)](statement.alternate, mod, scope); // fix scope for later stuff

      scope.mcFunctionContents = oldMCFunctionContents;
      scope.mcFunctionPath = oldMCFunctionPath;
      scope.datapackFolder = oldDatapackFolder;
      scope.statementContext = oldContext;
    }
  } else {
    // fix scope for later stuff
    scope.mcFunctionContents = oldMCFunctionContents;
    scope.mcFunctionPath = oldMCFunctionPath;
    scope.datapackFolder = oldDatapackFolder;
    scope.statementContext = oldContext;
  }
}; // ZIP SKIPPED


transpiler.transpileForStatement = function (statement, mod, scope) {
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " for statement")); // try to use ifstatement? possibly not possible? Everything conditional?

  var oldMCFunctionPath = scope.mcFunctionPath;
  var oldMCFunctionContents = scope.mcFunctionContents;
  var oldDatapackFolder = scope.datapackFolder;
  var oldContext = scope.statementContext;
  var statementName = newStatementSubPath(statement.loc.start.line, "for-loop");
  var forStatementMCFunctionPath = oldMCFunctionPath + statementName;
  var forStatementFolder = newJsonFile(scope.datapackFolder, statementName, "folder");
  scope.mcFunctionPath = forStatementMCFunctionPath; // JSONfolder[statementName] = {};
  // var newJSONfolder = JSONfolder[statementName];
  // transpile the first part of for loop ex: var i = 0;

  var forStatementInit = statement.init;

  var forLoopInitCommand = _library.default.function("".concat(scope.mcFunctionPath, "/init")).join(" ");

  if (["AssignmentExpression", "VariableDeclaration"].includes(forStatementInit.type)) {
    scope.statementContext = "init";
    scope.mcFunctionName = "init";
    scope.mcFunctionContents = newJsonFile(forStatementFolder, "init", "mcfunction").contents;
    transpiler["transpile".concat(forStatementInit.type)](forStatementInit, mod, scope);
  } else {
    throw new VModError(forStatementInit.loc, "VanillaMod: IncompatibleStatementType. " + "The type ".concat(forStatementInit.type, " cannot be used to initialize a for loop"));
  } // second part ex: i < 5;


  var forStatementCondition = statement.test;

  var forStatementConditionCommand = _library.default.function("".concat(scope.mcFunctionPath, "/condition")).join(" ");

  if (["CallExpression", "BinaryExpression"].includes(forStatementCondition.type)) {
    scope.statementContext = oldContext;
    scope.mcFunctionName = oldContext;
    scope.mcFunctionContents = oldMCFunctionContents;

    if (isSimpleBinaryCondition(forStatementCondition)) {
      forStatementConditionCommand = transpiler.transpileBinaryExpression(forStatementCondition, mod, scope, true);
    } else if (isSimpleCallExpressionCondition(statement)) {
      forStatementConditionCommand = transpiler.transpileCallExpression(forStatementCondition, mod, scope, true);
    } else {
      throw new VModError(forStatementCondition.loc, "VanillaMod: The condition used is overly complex. " + "Try a simple comparison like yourVar < 5 or vMod.yourCommand(...)"); // once I actually build a complex condition parser
      // scope.statementContext = 'condition'
      // scope.mcFunctionName = 'condition'
      // scope.mcFunctionContents = newJsonFile(forStatementFolder, 'condition', 'mcfunction').contents
      // transpiler['transpile' + forStatementCondition.type](forStatementCondition, mod, scope)
    }
  } else {
    throw new VModError(forStatementCondition.loc, "VanillaMod: IncompatibleStatementType. The type " + "".concat(forStatementCondition.type, " cannot be used as a condition"));
  } // third part ex: i++)


  var forStatementUpdate = statement.update;

  var forStatementUpdateCommand = _library.default.function("".concat(scope.mcFunctionPath, "/update")).join(" ");

  if (["AssignmentExpression", "UpdateExpression"].includes(forStatementUpdate.type)) {
    scope.statementContext = "update";
    scope.mcFunctionName = "update";
    scope.mcFunctionContents = newJsonFile(forStatementFolder, "update", "mcfunction").contents;
    transpiler["transpile".concat(forStatementUpdate.type)](forStatementUpdate, mod, scope);
  } else {
    throw new VModError(forStatementUpdate.loc, "VanillaMod: IncompatibleStatementType. " + "The type ".concat(forStatementUpdate.type, " cannot be used as an updater in a for loop"));
  } // block statement


  var forStatementBodyCommand = "execute if entity ".concat(LAST_SUCCESS_TRUE(), " run ") + "".concat(_library.default.function("".concat(scope.mcFunctionPath, "/body")).join(" "));
  scope.statementContext = statementName;
  scope.mcFunctionName = "body";
  scope.mcFunctionContents = newJsonFile(forStatementFolder, "body", "mcfunction").contents;
  transpiler["transpile".concat(statement.body.type)](statement.body, mod, scope); // lower/for-loop body

  scope.mcFunctionContents.push(forStatementUpdateCommand);
  scope.mcFunctionContents.push(forStatementConditionCommand);
  scope.mcFunctionContents.push(forStatementBodyCommand); // fix scope for later stuff

  scope.mcFunctionContents = oldMCFunctionContents;
  scope.mcFunctionPath = oldMCFunctionPath;
  scope.datapackFolder = oldDatapackFolder;
  scope.statementContext = oldContext;
  scope.mcFunctionName = oldContext; // upper main

  scope.mcFunctionContents.push(forLoopInitCommand);
  scope.mcFunctionContents.push(forStatementConditionCommand);
  scope.mcFunctionContents.push(forStatementBodyCommand); // kill variables created in init

  var blockScopeTag = "".concat(forStatementMCFunctionPath.replace(/[:|/]/g, "."), "-depth-").concat(scope.depth);
  var killInitVars = "kill @e[tag=".concat(blockScopeTag, "]");
  scope.mcFunctionContents.push(killInitVars);
};

transpiler.transpileExpressionStatement = function (statement, mod, scope) {
  // function call -- technically var declaration is an expressionstatement too
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " expression statement")); // this looks wrong
  // debugPrint(statement.expression.type);

  if (transpiler.hasOwnProperty("transpile".concat(statement.expression.type))) {
    transpiler["transpile".concat(statement.expression.type)](statement.expression, mod, scope);
  } else {
    throw new VModError(statement.loc, "Invalid expression type ".concat(statement.expression.type, ". It's possible what you're trying to do is not currently supported by VanillaMod"));
  }
};

transpiler.transpileCallExpression = function (statement, mod, scope) {
  var isCondition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " function call (expression)")); // I have to do it like this until the validator works properly

  if (statement.callee.type === "MemberExpression" && statement.callee.object && statement.callee.object.name === "console") {
    if (statement.callee.property.name === "log") {
      var command = ["tellraw", "@p", minecraftPrintJSON(scope, statement.arguments)];
      var validatedCommand = command.join(" "); // debugPrint("scope: ", JSON.stringify(scope, null, 4));
      // debugPrint(
      //   "command contents",
      //   scope.mcFunctionContents,
      //   "is it an array?:",
      //   Array.isArray(scope.mcFunctionContents),
      //   "typeof",
      //   typeof scope.mcFunctionContents
      // );

      scope.mcFunctionContents.push(validatedCommand);
      return;
    }

    throw new VModError(statement.callee.property.loc, "Consoles are only good for logging. use console.log()");
  } // declare calledfunctionname out here for when it is not a memberExpession


  if (statement.callee.type === "MemberExpression") {
    var validateObject = _validator.default.validate(statement, scope.variables); // debugPrint('scope: ', JSON.stringify(scope))
    // debugPrint('command contents', scope.mcFunctionContents)


    var _validatedCommand = validateObject.command.join(" "); // console.log("here validate object", validateObject)
    // Used to simplify if statements


    if (isCondition) {
      debugPrint("Adding conditional to command: ".concat(_validatedCommand));
      _validatedCommand = "execute store success score @s vMod_LastSuccess run ".concat(_validatedCommand);
      return _validatedCommand;
    } // debugPrint('scope: ', JSON.stringify(scope))
    // debugPrint('command contents', scope.mcFunctionContents)
    // console.log("here validated command", validatedCommand)


    scope.mcFunctionContents.push(_validatedCommand);
  } else {
    // function *should* be user defined and should not have an object
    var calledFunctionName = snakeCaser(statement.callee.name);

    if (scope.variables.has(calledFunctionName)) {
      if (!statement.callee.object) {
        // something something do scoreboard stuff for parameters
        scope.mcFunctionContents.push(_library.default.function(getMCFunctionPath(mod, calledFunctionName, "main")).join(" "));
      } else {
        throw new VModError(statement.loc, "User defined objects cannot call user defined functions." + "\nTry checking your spelling, otherwise ask for help on our Discord!");
      }
    } else {
      throw new VModError(statement.loc, "There is no function with the name ".concat(statement.callee.name, "().") + "\nTry checking for spelling errors.");
    }
  }
};

transpiler.transpileUpdateExpression = function (statementToTransform, mod, scope) {
  var transformedStatement = statementToTransform; // debugPrint('preTransformedStatement: ', transformedStatement);

  transformedStatement.type = "AssignmentExpression";
  transformedStatement.left = transformedStatement.argument;
  delete transformedStatement.argument;
  transformedStatement.right = {
    type: "Literal",
    value: 1,
    raw: "1"
  };
  delete transformedStatement.prefix;

  switch (transformedStatement.operator) {
    case "++":
      transformedStatement.operator = "+=";
      break;

    case "--":
      transformedStatement.operator = "-=";
      break;

    default:
      throw new VModError(statementToTransform.loc, "This kind of update operator is not supported, try ++ or --");
  }

  transpiler.transpileAssignmentExpression(transformedStatement, mod, scope);
}; // NEEDS 1.13 HELP, LOOK IN SWITCH STATEMENT


transpiler.transpileAssignmentExpression = function (statement, mod, scope) {
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " assignment expression"));
  var varName = statement.left.name;

  if (scope.variables.has(varName)) {
    var toBeAssigned = scope.variables.get(varName);
    fixIfNegativeNumber(statement.right);

    if (statement.right.type === "Literal" && typeof statement.right.value === "number") {
      if (!toBeAssigned.defined) {
        scope.variables.set(varName, new _variables.default.Integer(toBeAssigned, scope.mcFunctionContents));
        var newInt = scope.variables.get(varName);
        var summonInteger = newInt.createInGameVariable();
        scope.mcFunctionContents.push(summonInteger);
      }

      toBeAssigned = scope.variables.get(varName);
      var editValue = "";

      switch (statement.operator) {
        case "=":
          if (statement.right.value == null) {
            editValue = "tag ".concat(toBeAssigned.getVariable(), " remove ").concat(toBeAssigned.scopedTag);
          } else {
            editValue = "scoreboard players set ".concat(toBeAssigned.getVariable(), " ").concat(STORE_VARIABLE_OBJECTIVE, " ").concat(statement.right.value);
          }

          break;

        case "+=":
          editValue = "scoreboard players add ".concat(toBeAssigned.getVariable(), " ").concat(STORE_VARIABLE_OBJECTIVE, " ").concat(statement.right.value);
          break;

        case "-=":
          editValue = "scoreboard players remove ".concat(toBeAssigned.getVariable(), " ").concat(STORE_VARIABLE_OBJECTIVE, " ").concat(statement.right.value);
          break;

        default:
          throw new VModError(statement.loc, "This kind of assignment expression is not supported, try =, +=, -=. " + "Feel free to ask on discord to move up the importance of adding more operations!");
      }

      scope.mcFunctionContents.push(editValue);
    } else if (statement.right.type === "NewExpression") {
      transpiler.transpileNewExpression(statement.right, mod, scope, statement.left.name);
    } else {
      throw new VModError(statement.right.loc, "Unsupported type. ".concat(statement.right.type, " cannot be used as part of an assignment expression"));
    }
  } else {
    throw new VModError(statement.left.loc, "variable: ".concat(statement.left.name, " is not declared or is out of scope"));
  }
}; // var testDrone = new vMod.Drone();


transpiler.transpileNewExpression = function (statement, mod, scope, varName) {
  // new object being declared
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " new expression")); // PARAMS FIRST (when we have them)
  // technically we should also kill the old drones, but lazy for now

  if (isValidNewObject(statement)) {
    var newType = statement.callee.property.name;
    var firstArg = "No Name";
    var toBeDefined = scope.variables.get(varName);

    if (statement.arguments.length === 0 || statement.arguments[0]) {
      if (statement.arguments.length > 0) {
        if (typeof statement.arguments[0].value === "string") {
          firstArg = statement.arguments[0].value;
        } else {
          throw new VModError(statement.arguments[0].loc, "Constructor arguments must be strings");
        }
      }

      if (_variables.default[newType] && _variables.default[newType].prototype.action) {
        scope.variables.set(varName, new _variables.default[newType](firstArg, toBeDefined, scope.mcFunctionContents));
        var entityObject = scope.variables.get(varName);

        if (toBeDefined.defined && toBeDefined.variableType !== entityObject.variableType) {
          throw new VModError(statement.loc, "Cannot redefine variables as a different type. " + "The variable ".concat(varName, " is already defined as a ").concat(toBeDefined.variableType));
        }

        var createCommands = entityObject.createInGameVariable();

        if (scope.variables.has(statement.callee.object.name)) {
          var object = scope.variables.get(statement.callee.object.name);

          if (object.params) {
            if (statement.callee.property && statement.callee.property.name === "setVariable") {
              // this area is to assign a living entity to a variable. How do?
              scope.variableCounter--;
            }
          } else {
            throw new VModError(statement.callee.loc, "Cannot do new expression with normal variables");
          }
        } else {
          var _scope$mcFunctionCont;

          (_scope$mcFunctionCont = scope.mcFunctionContents).push.apply(_scope$mcFunctionCont, _toConsumableArray(createCommands));
        }
      } // THERE WAS AMERGE CONFLICT HERE. I DON't KNOW WHAT THIS DOES
      // if (Array.isArray(createCommands)) {
      //   scope.mcFunctionContents.push(...createCommands)
      //   debugPrint('it was an array, mcfunctioncontents:', scope.mcFunctionContents)

    } else {
      throw new VModError(statement.callee.property.loc, "Unknown constructor: ".concat(newType, " try Drone() or Team()"));
    } // end isValidNewObject

  } // end function

}; // Need better error handling to complete below
// at some point there should be a reference tag and a kill tag.
// kill tag is only given if vMod created the entity, so players and existing entities can be variables and only be given the reference tag
// } else if (newType == 'Team') {
//   if (varName.length <= 16) {
//     if (toBeDefined.defined) {
//       if (toBeDefined instanceof vars.Team) {
//         //clear old var if possible (add this to Drone eventually)
//         scope.mcFunctionContents.push(toBeDefined.clearReference());
//       } else {
//         // Should this be here, or should it part of variables.js? Every variable should have a clear-reference?
//         throw new VModError( statement.loc, message:  'Typing error. You cannot change the type of the variable: "' + toBeDefined.varName + '" to a team because it is already something else'}
//       }
//     } else {
//       //remove old team just to be safe
//       scope.mcFunctionContents.push(`team remove ${varName}`);
//     }
//     toBeDefined.defined = true;
//     scope.variables.set(varName, new vars.Team(firstArg, toBeDefined))
//     let teamObject = scope.variables.get(varName);
//     //create new team (should this be partially generated by vars.Team?) YES! SAME WITH DRONE
//     scope.mcFunctionContents.push(teamObject.createTeam());
//   } else {
//     throw new VModError( statement.loc, message:  'Team names are limited to 16 characters, ' + varName + ' is too long. Eventually VanillaMod may generate a hash for you, not yet'}
//   }
// }
// }
// 5 + 5 / 2


transpiler.transpileBinaryExpression = function (statement, mod, scope) {
  var getSimpleCommand = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " binary expression")); // assumes variable on the left

  var test = statement;

  if (test.left.type !== "Identifier") {
    throw new VModError(test.left.loc, "VanillaMod InvalidType. The left side of a math condition must be a variable");
  }

  var leftVariableName = test.left.name;
  var leftVariable = scope.variables.has(leftVariableName) ? scope.variables.get(leftVariableName) : undefined;

  if (!leftVariable) {
    throw new VModError(test.left.loc, "ReferenceError. The variable ".concat(leftVariableName, " does not exist"));
  }

  if (leftVariable.variableType !== "int") {
    throw new VModError(test.left.loc, "VanillaMod TypeError. The variable ".concat(leftVariableName, " is not a number"));
  }

  test.right = fixIfNegativeNumber(test.right);

  if (test.right.type === "Identifier") {
    // execute store success score @s vMod_LastSuccess if score @e[tag=vMod_number,limit=1] vMod_Variable <= #TheNumberFive vMod_Variable
    var rightVariableName = test.right.name;
    var rightVariable = scope.variables.has(rightVariableName) ? scope.variables.get(rightVariableName) : undefined;

    if (!rightVariable) {
      throw new VModError(test.right.loc, "ReferenceError. The variable ".concat(rightVariableName, " does not exist"));
    }

    if (rightVariable.variableType !== "int") {
      throw new VModError(test.left.loc, "VanillaMod TypeError. The variable ".concat(rightVariableName, " is not a number"));
    } // change == or === to just = for minecraft


    var operator = test.operator === "==" || test.operator === "===" ? "=" : test.operator;
    var comparisonCommand = "execute store success score @s vMod_LastSuccess if score ".concat(leftVariable.getVariable(true), " ") + "vMod_Variable ".concat(operator, " ").concat(rightVariable.getVariable(true), " vMod_Variable"); // Used to simplify condition checks if they are simple

    if (getSimpleCommand) {
      return comparisonCommand;
    }

    scope.mcFunctionContents.push(comparisonCommand);
  } else if (test.right.type === "Literal" && typeof test.right.value === "number") {
    var comparedInteger = test.right.value;
    var range = "..";

    switch (test.operator) {
      case "<":
        range += comparedInteger - 1;
        break;

      case ">":
        range = comparedInteger + 1 + range;
        break;

      case "<=":
        range += comparedInteger;
        break;

      case ">=":
        range = comparedInteger + range;
        break;

      case "==":
        range = comparedInteger;
        break;

      case "===":
        range = comparedInteger;
        break;
      // also !=, but we not doing dat yet

      default:
        throw new VModError(test.loc, "This kind of comparison is not supported, try ==, <, >, >=, <=. " + "Feel free to ask on discord to move up the importance of adding more comparisons!");
    }

    var _comparisonCommand = "execute store success score @s vMod_LastSuccess if score " + "".concat(leftVariable.getVariable(true), " vMod_Variable matches ").concat(range); // Used to simplify condition checks if they are simple


    if (getSimpleCommand) {
      return _comparisonCommand;
    }

    scope.mcFunctionContents.push(_comparisonCommand);
  } else {
    throw new VModError(test.right.loc, "VanillaMod InvalidType. ".concat(JSON.stringify(test.right), " must be a variable or a number"));
  }
}; // bool1 || bool2 && bool3


transpiler.transpileLogicalExpression = function (statement, mod, scope) {
  // this one may be harder, look into 1s and 0s, adding them together, using % 2
  // this one gets funny with large numbers and > or <
  // figure out how to do without conditionals/scoreboard test?
  // probably not possible
  // scope.depth FIRST
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " logical expression"));
  throw new VModError(statement.loc, "VanillaMod is not able to handle logical expressions right now");
}; // testVar = otherVar;


transpiler.transpileIdentifier = function (statement, mod, scope) {
  // this is easy, check scope, and then... ?
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " simple assignment expression"));
};

transpiler.transpileLiteral = function (statement, mod, scope) {
  debugPrint("".concat(indenter(scope.depth)).concat(scope.depth, ":").concat(scope.index, " literal (found on its own?)"));
  throw new VModError(statement.loc, "Unused literal, try removing it");
}; // lots of console.log in here before, is it buggy?


function isSimpleBinaryCondition(statement) {
  if (statement.type !== "BinaryExpression") {
    return false;
  }

  if (statement.left.type !== "Identifier") {
    return false;
  }

  if (!["Identifier", "Literal"].includes(statement.right.type)) {
    return false;
  }

  return true;
}

function isSimpleCallExpressionCondition(statement) {
  if (statement.type !== "CallExpression") {
    return false;
  }

  if (statement.callee.type !== "MemberExpression") {
    return false;
  }

  if (statement.callee.object.type !== "Identifier" || statement.callee.property.type !== "Identifier") {
    return false;
  }

  if (statement.callee.object.name !== "vMod" || statement.callee.object.name !== "mc") {
    return false;
  }

  return true;
}

function isValidNewObject(statement) {
  if (statement.callee.type !== "MemberExpression") {
    throw new VModError(statement.loc, "Creating new objects must look like this: new library.objectName(...)" + "\n(Not in MemberExpression format)");
  }

  if (statement.callee.object.type !== "Identifier" || statement.callee.property.type !== "Identifier") {
    throw new VModError(statement.loc, "Creating new objects must look like this: new library.objectName(...)" + "\n(Both sides of MemberExpression must be Identifiers)");
  }

  if (statement.callee.object.name === "vMod") {
    if (statement.callee.property.name === "Drone") {
      return true;
    }

    throw new VModError(statement.callee.property.name, "The vMod library does not contain object type: " + "'vMod.".concat(statement.callee.property.name, "', try using vMod.Drone(...)"));
  }

  if (statement.callee.object.name === "mc") {
    if (statement.callee.property.name === "Team") {
      return true;
    }

    throw new VModError(statement.callee.property.name, "The mc library does not contain object type: " + "'mc.".concat(statement.callee.property.name, "', try using mc.Team(...)"));
  }

  throw new VModError(statement.callee.object.name, "The library or object: ".concat(statement.callee.object.name, " does not exist, ") + "try using mc. or vMod.");
}

function fixIfNegativeNumber(statement) {
  if (statement.type === "UnaryExpression" && statement.operator === "-") {
    var newStatement = statement.argument;

    if (newStatement.type === "Literal" && typeof newStatement.value === "number") {
      newStatement.value *= -1;
      newStatement.raw = "-".concat(newStatement.raw);
      return newStatement;
    }

    throw new VModError(statement.loc, "VanillaMod error. Negative signs can only be used with numbers");
  }

  return statement;
}

function debugPrint() {
  var _console;

  // if (process.env.ENVIRONMENT == 'dev') {
  // eslint-disable-next-line no-console
  (_console = console).log.apply(_console, arguments); // }

} // function modIdHasher(projectPrefix, functionName) {
//   const modHashObj = { projectPrefix };
//   let modHash = hash(modHashObj);
//   modHash = modHash.substring(0, 6);
//   const functionHashObj = { functionName };
//   let functionHash = hash(functionHashObj);
//   functionHash = functionHash.substring(0, 4);
//   const hashedId = `vmod-${modHash}-${functionHash}`;
//   return hashedId;
// }
// https://gist.github.com/iperelivskiy/4110988#gistcomment-2697447
// function hash(s) {
//   for (let i = 0, h = 0xdeadbeef; i < s.length; i++)
//     h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
//   return (h ^ (h >>> 16)) >>> 0;
// }


function indenter(depth) {
  var indent = "";

  for (var i = 0; i < depth; i++) {
    indent += "    ";
  }

  return indent;
} // move to variables or library-1-13.js


function minecraftPrintJSON(scope, args) {
  var tellrawJSON = '[""';
  args.forEach(function (argument) {
    if (argument.type) {
      switch (argument.type) {
        case "Identifier":
          if (scope.variables.has(argument.name)) {
            var variableToPrint = scope.variables.get(argument.name);

            if (variableToPrint.defined) {
              if (variableToPrint.prettyJSON) {
                tellrawJSON += ",".concat(variableToPrint.prettyJSON());
              }
            } else {
              tellrawJSON += ',"undefined"';
            }
          } else {
            throw new VModError(argument.loc, "ReferenceError. ".concat(argument.name, " is undefined"));
          }

          break;

        case "Literal":
          tellrawJSON += ",\"".concat(argument.value, "\"");
          break;

        default:
          throw new VModError(argument.loc, "VanillaMod InvalidType error. The argument type ".concat(argument.type, " cannot be used in a console.log"));
      }
    } else if (typeof argument === "string") {
      tellrawJSON += ",\"".concat(argument, "\"");
    }

    tellrawJSON += '," "';
  });
  tellrawJSON += "]";
  return tellrawJSON;
}

function getMCFunctionPath(mod, calledFunction, mcFunctionName) {
  return "".concat(mod.NAME, ":").concat(calledFunction, "/").concat(mcFunctionName);
}

function snakeCaser(str) {
  return str.replace(/([a-z])([A-Z]+)/g, function (txt) {
    return "".concat(txt.substring(0, 1).toLowerCase(), "_").concat(txt.substring(1).toLowerCase());
  }).replace(/ /g, "_").toLowerCase();
}

function newStatementSubPath(codeLine, statementType) {
  return "line".concat(pad("0000", codeLine), "_").concat(statementType);

  function pad(paddingLeft, str, paddingRight) {
    // debugPrint('padding test of', str, 'with', paddingLeft+paddingRight);
    if (typeof str === "undefined") return paddingLeft || paddingRight;

    if (paddingLeft) {
      return (paddingLeft + str).slice(-paddingLeft.length);
    }

    return (str + paddingRight).substring(0, paddingRight.length);
  }
}

var _default = transpiler; // }
// vMod quirks:
// considers every variable declaration as let i.e. all are block-scoped (unlike var) and all can be re-assigned (unlike const)
//
// if a variable is defined (assigned a new type) at runtime (so say "var red" is defined as a team in one function and a drone in the other),
// VanillaMod will pick the most recently defined type in the code by line, not by what actually happened in game. Basically, don't do that.
//
// globally/more-shallow declared variables cannot run/execute functions until they are defined in code
//
// Naming a function "main" does weird stuff

exports.default = _default;

//# sourceMappingURL=transpiler.js.map