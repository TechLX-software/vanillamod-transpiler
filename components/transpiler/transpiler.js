/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

import { parseScript } from "esprima";

import vMod from "./library-1-13";
import vars from "./variables";
import validator from "./validator";
import MCF_library from "./resources/vMod-MCF-library.json";

const transpiler = {};

const STORE_VARIABLE_OBJECTIVE = "vMod_Variable";
const INIT_HELPER_ARRAY = (selector) => [
  "scoreboard objectives add vMod_LastSuccess dummy",
  `scoreboard players set ${selector} vMod_LastSuccess 0`,
  `scoreboard objectives add ${STORE_VARIABLE_OBJECTIVE} dummy`,
];

const LAST_SUCCESS_TRUE = (selector = "") =>
  `@s[${selector}scores={vMod_LastSuccess=1..}]`;
// const LAST_SUCCESS_FALSE = (selector = "") =>
//   `@s[${selector}scores={vMod_LastSuccess=..0}]`;

class VModError extends Error {
  constructor(location, message) {
    const wrappedMessage = message
      .trim()
      .replace(
        new RegExp(`(?![^\\n]{1,${100}}$)([^\\n]{1,${100}})\\s`, "g"),
        "$1\n"
      );
    super(wrappedMessage);
    this.location = location;
  }
}

function jsonFile(fileName, fileType, fileContents = []) {
  if (!/[a-z0-9_.-]/.test(fileName)) {
    throw new VModError(
      "VanillaMod Source Code (sort of)",
      `The file name ${fileName} contains a non [a-z0-9_.-] character (Uppercase is not allowed)`
    );
  }
  return {
    name: fileName,
    type: fileType,
    contents: fileContents,
  };
}

function newJsonFile(directory, fileName, fileType, fileContents = []) {
  const file = jsonFile(fileName, fileType, fileContents);
  directory.contents.push(file);
  return file;
}

function getFileContentsByName(fileName, currentFolder) {
  const folderArray = currentFolder.contents
    ? currentFolder.contents
    : currentFolder;
  const folder = folderArray.find((file) => file.name === fileName);
  if (folder) {
    return folder.contents ? folder.contents : undefined;
  }
  return undefined;
}

function getFileByName(fileName, currentFolder) {
  const folderArray = currentFolder.contents
    ? currentFolder.contents
    : currentFolder;
  const folder = folderArray.find((file) => file.name === fileName);
  return folder;
}

// https://www.reddit.com/r/Minecraft/comments/3xx4xz/modern_scientific_calculator/

transpiler.compile = (rawJavaScript, modInfo) => {
  debugPrint("modInfo:", modInfo);

  let parsedJS;
  try {
    parsedJS = parseScript(rawJavaScript, { loc: true });
  } catch (e) {
    const location = {
      esprima: true,
      line: e.lineNumber,
      col: e.column,
      index: e.index,
    };
    return { errors: [new VModError(location, e.description)] };
  }

  const snakeCaseModName = snakeCaser(modInfo.modName);

  const mod = {
    objectives: [],
    initFunctionsList: [],
    OWNER_NAME: "USER_NAME_HERE",
    NAME: snakeCaseModName,
    TAG: `vMod-${snakeCaseModName}`,
    dependencies: [],
    addDependency(dependencyName) {
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
          description: `A VanillaMod by ${"USER_NAME_HERE"}. Last updated on ${new Date().toLocaleString()}`,
        },
      },
      data: [
        jsonFile(snakeCaseModName, "folder", [jsonFile("functions", "folder")]),
        jsonFile("minecraft", "folder", [
          jsonFile("tags", "folder", [
            jsonFile("functions", "folder", [
              jsonFile("load", "json", {
                values: [`${snakeCaseModName}:init`],
              }),
            ]),
          ]),
        ]),
      ],
    },
  };

  // vMod.spigotPrefix(modInfo.spigot);
  vars.initialize(mod);

  // this try catch might be worth implementing once we're client-side?

  // try {
  transpiler.transpileProgramStatement(parsedJS, mod);
  // } catch (e) {
  //   debugPrint('Caught unhandled transpiler error: ', JSON.stringify(e));
  //   return ['Unhandled transpiler error:\n' + JSON.stringify(e)];
  // } //redundant redundancies

  if (mod.errors.length > 0) {
    debugPrint("errors found by vMod: ", mod.errors);
    return { errors: mod.errors };
  }

  // add dependencies:
  if (mod.dependencies.length > 0) {
    const vanillaModMCF_library = jsonFile("functions", "folder");
    const libraryContents = vanillaModMCF_library.contents;

    mod.dependencies.forEach((dependency) => {
      const dependencyMCFunctionContents = MCF_library[dependency];
      libraryContents.push(dependencyMCFunctionContents);
    });

    mod.datapackJson.data.push(
      jsonFile("vanillamod-library", "folder", [vanillaModMCF_library])
    );
  }

  debugPrint("datapack JSON:", mod.datapackJson);

  return mod.datapackJson;
};

transpiler.transpileProgramStatement = (programStatement, mod) => {
  debugPrint("datapack JSON at start:", mod.datapackJson);
  const functionsFolder = getFileByName("functions", mod.datapackJson.data[0]); // get the function folder from the namespace of this mod
  const scope = {
    functionName: "vMod-GLOBAL",
    mcFunctionName: "main",
    statementContext: "program",
    depth: 0,
    index: 0,
    variables: new Map(),
    variableCounter: 0,
    datapackFolder: functionsFolder,
    // folderContents: functionsFolder.contents,
    mcFunctionPath: `${mod.NAME}:`,
    mcFunctionContents: [], // getFileContentsByName(scope.mcFunctionName, datapackFolder)
  };

  debugPrint(
    `${indenter(scope.depth) + scope.depth}:${scope.index} program statement [`
  );
  let modInit;
  let modInitMain;
  try {
    // assign easily accessible vars to and create mcfunctions
    modInit = newJsonFile(scope.datapackFolder, "init", "mcfunction")
      .contents;
    modInitMain = newJsonFile(
      scope.datapackFolder,
      scope.mcFunctionName,
      "mcfunction",
      INIT_HELPER_ARRAY("@s")
    ).contents;
    scope.mcFunctionContents = modInitMain;

    // vars. NEEDS FIX with new JSON variables
    const thisMod = new vars.Function(mod.NAME, null);

    // add commands to remove scoreboard objectives.
    const clearThisModEntities = `kill @e[tag=${mod.TAG}]`;
    modInit.push(clearThisModEntities);
    // add commands to init
    modInit.push(thisMod.createInGameVariable());
    modInit.push(`function ${scope.mcFunctionPath}main`);
    modInit.push(`kill ${thisMod.getSelector()}`);
  } catch (e) {
    mod.errors.push(e);
  }

  // get all functions in an array
  const esprimaFunctions = programStatement.body.filter(
    (nextStatement) => nextStatement.type === "FunctionDeclaration"
  );

  // do function initialize loop. This is a setup step and also hoists the functions above everything else.
  esprimaFunctions.forEach((functionStatement) => {
    try {
      transpiler.initializeFunction(functionStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  });

  // hoist variable declarations.
  const variableDeclarationsToHoist = programStatement.body.filter(
    (nextStatement) => nextStatement.type === "VariableDeclaration"
  );

  variableDeclarationsToHoist.forEach((variableStatement) => {
    try {
      transpiler.transpileVariableDeclaration(variableStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  });

  // Do preloop for everything else in global scope.
  const hoistedStatements = [
    ...esprimaFunctions,
    ...variableDeclarationsToHoist,
  ];
  const nonHoistedStatements = programStatement.body.filter(
    (nextStatement) => !hoistedStatements.includes(nextStatement)
  );

  nonHoistedStatements.forEach((initStatement) => {
    try {
      // console.log(`Doing a thing in global scope that is not hoisted but coming first because it's not in a function: ${initStatement.type}`)
      if (transpiler.hasOwnProperty(`transpile${initStatement.type}`)) {
        transpiler[`transpile${initStatement.type}`](initStatement, mod, scope);
      } else {
        throw new VModError(
          initStatement.loc,
          `InvalidType. VanillaMod does not currently support ${initStatement.type}`
        );
      }
    } catch (e) {
      mod.errors.push(e);
    }
  });

  debugPrint("Do stuff inside functions now (loop #2)");
  esprimaFunctions.forEach((functionStatement) => {
    // debugPrint('in statement with statement type:', statement.type);
    try {
      transpiler.transpileFunctionDeclaration(functionStatement, mod, scope);
    } catch (e) {
      mod.errors.push(e);
    }
  });

  try {
    mod.objectives.forEach((objectiveName) => {
      const removeObjective = `scoreboard objectives remove ${objectiveName}`;
      modInit.unshift(removeObjective);
    });

    modInitMain.push(
      `say ${mod.NAME} has been initialized, feel free to run functions:`
    );
    debugPrint("init functions", mod.initFunctionsList);
    modInitMain.push(...mod.initFunctionsList);
  } catch (e) {
    mod.errors.push(e);
  }
};

transpiler.initializeFunction = (statement, mod, scope) => {
  const newFunctionName = snakeCaser(statement.id.name);
  if (!/[a-z0-9_.-]/.test(newFunctionName)) {
    throw new VModError(
      statement.id.loc,
      `The file name ${newFunctionName} contains a non [a-z0-9_.-] character. ` +
        "It should only have lowercase letters, numbers, periods, underscores, or hyphens"
    );
  }
  if (scope.variables.has(newFunctionName)) {
    throw new VModError(
      statement.id.loc,
      `There is already a function called ${newFunctionName}. ` +
        "Function names must be unique, ignoring uppercase and lowercase."
    );
  }

  scope.variables.set(
    newFunctionName,
    new vars.Function(newFunctionName, statement.params)
  );

  const runFunctionOnClick = scope.variables
    .get(newFunctionName)
    .createClickableFunctionChatJSON(mod, newFunctionName);
  mod.initFunctionsList.push(`tellraw @p ${runFunctionOnClick}`);

  // for each param add an objective, only if another is needed. e.g. statement.params.length > totalParamCount
  // have a method in vars.Function to get the number of params
};

transpiler.transpileFunctionDeclaration = (statement, mod, scope) => {
  const newFunctionName = snakeCaser(statement.id.name);
  const thisFunction = scope.variables.get(newFunctionName);

  scope.functionName = newFunctionName;
  scope.mcFunctionName = "main";
  // standardize this maybe?
  scope.mcFunctionPath = `${mod.NAME}:${scope.functionName}`;
  // Create new folder for user-defined JS function
  const functionFolder = newJsonFile(
    scope.datapackFolder,
    scope.functionName,
    "folder"
  ); // go inside the new folder for user-defined function
  scope.statementContext = scope.functionName; // give block statement the path to enter
  // create new main mcfunction
  scope.mcFunctionContents = newJsonFile(
    functionFolder,
    "main",
    "mcfunction"
  ).contents;
  // Create new run mcfunction
  const runFunction = newJsonFile(functionFolder, "run", "mcfunction").contents;

  // Creates function variable that runs the function. Eventually,
  // the player should be the one that runs the function
  runFunction.push(thisFunction.createInGameVariable());
  runFunction.push(...INIT_HELPER_ARRAY(thisFunction.getSelector()));
  runFunction.push(
    vMod
      .executeShort(
        thisFunction.getSelector(),
        vMod.function(
          getMCFunctionPath(mod, scope.functionName, scope.mcFunctionName)
        )
      )
      .join(" ")
  );
  runFunction.push(`kill ${thisFunction.getSelector()}`);

  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } function declaration`
  );
  transpiler[`transpile${statement.body.type}`](statement.body, mod, scope);
  // first see if init stuff works

  // something something parameters
};

transpiler.transpileBlockStatement = (statement, mod, oldScope) => {
  // Creating new scope
  // const unreferencedDatapackFolder = JSON.parse(JSON.stringify(oldScope.datapackFolder))
  const newDatapackFolder = getFileByName(
    oldScope.statementContext,
    oldScope.datapackFolder
  );

  // debugPrint('Attempted unref:', JSON.stringify(unreferencedDatapackFolder, null, 4))
  // debugPrint('changing old scope')
  // //oldScope.datapackFolder =
  // debugPrint('Attempted unref 2:', JSON.stringify(unreferencedDatapackFolder, null, 4))
  const scope = {
    functionName: oldScope.functionName,
    mcFunctionName: oldScope.mcFunctionName,
    statementContext: oldScope.statementContext,
    depth: oldScope.depth + 1,
    index: 0,
    variables: new Map(oldScope.variables),
    variableCounter: 0,
    datapackFolder: newDatapackFolder,
    // folderContents: newDatapackFolder.contents,
    mcFunctionPath: `${oldScope.mcFunctionPath}/`,
    mcFunctionContents: [], // getFileContentsByName(scope.mcFunctionName, datapackFolder)
  };
  scope.mcFunctionContents = getFileContentsByName(
    scope.mcFunctionName,
    scope.datapackFolder
  );
  debugPrint(
    `${indenter(scope.depth) + scope.depth}:${scope.index} block statement [`
  );

  // awesome ingame debug helper:
  // scope.mcFunctionContents.push(`say Now running ${scope.mcFunctionName} from: ${scope.mcFunctionPath}));

  statement.body.forEach((bodyStatement) => {
    if (typeof transpiler[`transpile${bodyStatement.type}`] === "function") {
      scope.index++;
      try {
        transpiler[`transpile${bodyStatement.type}`](bodyStatement, mod, scope);
      } catch (e) {
        mod.errors.push(e);
      }
    }
  });

  if (scope.depth > 0 && scope.variableCounter > 0) {
    const blockScopeTag = `${scope.mcFunctionPath.replace(
      /[:|/]/g,
      "."
    )}depth-${scope.depth}`;
    const killOldVars = `kill @e[tag=${blockScopeTag}]`;
    scope.mcFunctionContents.push(killOldVars);
  }
  debugPrint(`${indenter(scope.depth)}]`);

  // possible rewrite thought that VariableDeclaration, ExpressionStatement, etc just return an array to push onto main,
  // therefore removing the need to pass them functionPath or JSONfolder.
};

transpiler.transpileVariableDeclaration = (statement, mod, scope) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } variable declaration`
  );

  if (statement.kind === "const") {
    throw new VModError(
      statement.loc,
      "VanillaMod incompatibility, constants are not yet supported"
    );
  }

  statement.declarations.forEach((declaration) => {
    const varName = declaration.id.name;
    if (!scope.variables.has(varName)) {
      debugPrint(`Variable: ${statement} being declared`);
      const codeLocation = statement.loc.start;
      const variableBeingDeclared = new vars.Declared(
        varName,
        scope.functionName,
        scope.depth,
        scope.mcFunctionPath,
        codeLocation.line,
        codeLocation.column,
        false,
        false
      );
      scope.variables.set(varName, variableBeingDeclared);
      // debugPrint('DECLARED: ', varName);
      // var errorLocation = statement.loc.start;
      // debugPrint('Line: ' +errorLocation.line+ ' Column: '+errorLocation.column)
      scope.variableCounter++;
    }
    if (declaration.init) {
      fixIfNegativeNumber(declaration.init);
      if (
        declaration.init.type === "Literal" &&
        typeof declaration.init.value === "number"
      ) {
        const toBeDefined = scope.variables.get(varName);
        if (!toBeDefined.defined) {
          scope.variables.set(
            varName,
            new vars.Integer(toBeDefined, scope.mcFunctionContents)
          );
          const newInt = scope.variables.get(varName);
          const summonInteger = newInt.createInGameVariable();
          scope.mcFunctionContents.push(summonInteger);

          const setValue = `scoreboard players set ${newInt.getVariable()} ${STORE_VARIABLE_OBJECTIVE} ${
            declaration.init.value
          }`;
          scope.mcFunctionContents.push(setValue);
        } else {
          throw new VModError(
            declaration.loc,
            `Do not redeclare variables, ${declaration.id.name} already exists!`
          );
        }
      } else if (declaration.init.type === "NewExpression") {
        declaration.init.justDeclared = true;
        transpiler.transpileNewExpression(
          declaration.init,
          mod,
          scope,
          varName
        );
      } else {
        throw new VModError(
          declaration.init.loc,
          "Variable defininitions should either be a new expression or an integer."
        );
      }
    }
  });
};

// ZIP SKIPPED
transpiler.transpileIfStatement = (statement, mod, scope) => {
  // handles if, else if, and else all in one ... well, it will
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${scope.index} if statement`
  );
  const oldMCFunctionPath = scope.mcFunctionPath;
  const oldMCFunctionContents = scope.mcFunctionContents;
  const oldDatapackFolder = scope.datapackFolder;
  const oldContext = scope.statementContext;

  // establish proper statement names
  const location = statement.loc.start;
  const statementName =
    scope.statementContext === "else"
      ? newStatementSubPath(location.line, "else-if")
      : newStatementSubPath(location.line, "if");
  const ifStatementMCFunctionPath = oldMCFunctionPath + statementName;
  debugPrint(
    "Statement name:",
    statementName,
    "current path:",
    ifStatementMCFunctionPath
  );

  // Create new folder for user-defined if/else statement with main and test
  const ifStatementFolder = newJsonFile(
    scope.datapackFolder,
    statementName,
    "folder"
  );
  const ifStatementMain = newJsonFile(ifStatementFolder, "main", "mcfunction")
    .contents;
  // REMOVED UNTIL COMPLEX CONDITIONALS ARE IMPLEMENTED
  // const ifStatementTest = newJsonFile(ifStatementFolder, 'test', 'mcfunction').contents
  const ifStatementTestPath = `${ifStatementMCFunctionPath}/test`;

  let checkConditionalCommand = vMod.function(ifStatementTestPath).join(" ");
  if (["CallExpression", "BinaryExpression"].includes(statement.test.type)) {
    scope.statementContext = oldContext;
    scope.mcFunctionName = oldContext;
    scope.mcFunctionContents = oldMCFunctionContents;

    if (isSimpleBinaryCondition(statement.test)) {
      checkConditionalCommand = transpiler.transpileBinaryExpression(
        statement.test,
        mod,
        scope,
        true
      );
    } else if (isSimpleCallExpressionCondition(statement.test)) {
      checkConditionalCommand = transpiler.transpileCallExpression(
        statement.test,
        mod,
        scope,
        true
      );
    } else {
      // REMOVED UNTIL COMPLEX CONDITIONALS ARE IMPLEMENTED
      throw new VModError(
        statement.test.loc,
        "VanillaMod: The condition used is overly complex. " +
          "Try a simple comparison like yourVar < 5 or vMod.yourCommand(...)"
      );
      // scope.statementContext = 'conditional'
      // scope.mcFunctionContents = ifStatementTest
      // scope.mcFunctionPath = ifStatementTestPath
      // transpiler['transpile' + statement.test.type](statement.test, mod, scope)
    }
  } else {
    throw new VModError(
      statement.test.loc,
      "VanillaMod: IncompatibleStatementType. " +
        `The type ${statement.test.type} cannot be used as a condition/boolean`
    );
  }

  // Add continue tag if needed
  const continueTag = `vMod-ElseContinue-${scope.functionName}-depth-${scope.depth}`;
  let testDoLoop = "";
  if (oldContext === "else") {
    testDoLoop = `execute if entity @s[tag=${continueTag}] run ${checkConditionalCommand}`;
  } else {
    if (statement.alternate) {
      oldMCFunctionContents.push(`tag @s add ${continueTag}`);
    }
    testDoLoop = checkConditionalCommand;
  }
  oldMCFunctionContents.push(testDoLoop);

  // Add continueTag check where needed to run the inside of else-if
  let conditionalBody = "";
  if (oldContext === "else") {
    conditionalBody = `execute if entity ${LAST_SUCCESS_TRUE(
      `tag=${continueTag},`
    )} run ${vMod.function(`${ifStatementMCFunctionPath}/main`).join(" ")}`;
  } else {
    conditionalBody = `execute if entity ${LAST_SUCCESS_TRUE()} run ${vMod
      .function(`${ifStatementMCFunctionPath}/main`)
      .join(" ")}`;
  }
  oldMCFunctionContents.push(conditionalBody);

  // Remove continue tag if the statement has an 'else'
  if (statement.alternate) {
    ifStatementMain.push(`tag @s remove ${continueTag}`);
  }

  scope.statementContext = statementName;
  scope.mcFunctionContents = ifStatementMain;
  debugPrint(
    "Concat path: oldMCPath:",
    oldMCFunctionPath,
    "statement name",
    statementName
  );
  scope.mcFunctionPath = oldMCFunctionPath + statementName;
  scope.mcFunctionName = "main";
  // newJSONfolder['main'].push(`tag @s remove ${continueTag}`);
  transpiler[`transpile${statement.consequent.type}`](
    statement.consequent,
    mod,
    scope
  );
  // 1.13 IF STATEMENT WILL NOT WORK UNTIL THIS IS FIXED

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
      debugPrint(
        `${indenter(scope.depth)} ${scope.depth}:${scope.index} else statement`
      );
      const elseLocation = statement.alternate.loc.start;
      const elseFolderName = newStatementSubPath(elseLocation.line, "else");
      scope.statementContext = elseFolderName;

      // move back into upper datapack folder to avoid nesting
      const elseFolder = newJsonFile(
        scope.datapackFolder,
        elseFolderName,
        "folder"
      );
      const elseMain = newJsonFile(elseFolder, "main", "mcfunction");

      // Adjust scope to new folder, making sure to avoid nesting
      scope.mcFunctionContents = elseMain.contents;
      scope.mcFunctionPath = oldMCFunctionPath + elseFolderName;
      scope.mcFunctionName = "main";

      // add command to do the 'else' (the if check failed)
      const alternate = `execute if entity @s[tag=${continueTag}] run ${vMod
        .function(`${scope.mcFunctionPath}/main`)
        .join(" ")}`;
      oldMCFunctionContents.push(alternate);

      transpiler[`transpile${statement.alternate.type}`](
        statement.alternate,
        mod,
        scope
      );

      // fix scope for later stuff
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
};

// ZIP SKIPPED
transpiler.transpileForStatement = (statement, mod, scope) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${scope.index} for statement`
  );
  // try to use ifstatement? possibly not possible? Everything conditional?

  const oldMCFunctionPath = scope.mcFunctionPath;
  const oldMCFunctionContents = scope.mcFunctionContents;
  const oldDatapackFolder = scope.datapackFolder;
  const oldContext = scope.statementContext;

  const statementName = newStatementSubPath(
    statement.loc.start.line,
    "for-loop"
  );
  const forStatementMCFunctionPath = oldMCFunctionPath + statementName;
  const forStatementFolder = newJsonFile(
    scope.datapackFolder,
    statementName,
    "folder"
  );
  scope.mcFunctionPath = forStatementMCFunctionPath;

  // JSONfolder[statementName] = {};
  // var newJSONfolder = JSONfolder[statementName];

  // transpile the first part of for loop ex: var i = 0;
  const forStatementInit = statement.init;
  const forLoopInitCommand = vMod
    .function(`${scope.mcFunctionPath}/init`)
    .join(" ");
  if (
    ["AssignmentExpression", "VariableDeclaration"].includes(
      forStatementInit.type
    )
  ) {
    scope.statementContext = "init";
    scope.mcFunctionName = "init";
    scope.mcFunctionContents = newJsonFile(
      forStatementFolder,
      "init",
      "mcfunction"
    ).contents;
    transpiler[`transpile${forStatementInit.type}`](
      forStatementInit,
      mod,
      scope
    );
  } else {
    throw new VModError(
      forStatementInit.loc,
      "VanillaMod: IncompatibleStatementType. " +
        `The type ${forStatementInit.type} cannot be used to initialize a for loop`
    );
  }

  // second part ex: i < 5;
  const forStatementCondition = statement.test;
  let forStatementConditionCommand = vMod
    .function(`${scope.mcFunctionPath}/condition`)
    .join(" ");
  if (
    ["CallExpression", "BinaryExpression"].includes(forStatementCondition.type)
  ) {
    scope.statementContext = oldContext;
    scope.mcFunctionName = oldContext;
    scope.mcFunctionContents = oldMCFunctionContents;
    if (isSimpleBinaryCondition(forStatementCondition)) {
      forStatementConditionCommand = transpiler.transpileBinaryExpression(
        forStatementCondition,
        mod,
        scope,
        true
      );
    } else if (isSimpleCallExpressionCondition(statement)) {
      forStatementConditionCommand = transpiler.transpileCallExpression(
        forStatementCondition,
        mod,
        scope,
        true
      );
    } else {
      throw new VModError(
        forStatementCondition.loc,
        "VanillaMod: The condition used is overly complex. " +
          "Try a simple comparison like yourVar < 5 or vMod.yourCommand(...)"
      );
      // once I actually build a complex condition parser
      // scope.statementContext = 'condition'
      // scope.mcFunctionName = 'condition'
      // scope.mcFunctionContents = newJsonFile(forStatementFolder, 'condition', 'mcfunction').contents
      // transpiler['transpile' + forStatementCondition.type](forStatementCondition, mod, scope)
    }
  } else {
    throw new VModError(
      forStatementCondition.loc,
      "VanillaMod: IncompatibleStatementType. The type " +
        `${forStatementCondition.type} cannot be used as a condition`
    );
  }

  // third part ex: i++)
  const forStatementUpdate = statement.update;
  const forStatementUpdateCommand = vMod
    .function(`${scope.mcFunctionPath}/update`)
    .join(" ");
  if (
    ["AssignmentExpression", "UpdateExpression"].includes(
      forStatementUpdate.type
    )
  ) {
    scope.statementContext = "update";
    scope.mcFunctionName = "update";
    scope.mcFunctionContents = newJsonFile(
      forStatementFolder,
      "update",
      "mcfunction"
    ).contents;
    transpiler[`transpile${forStatementUpdate.type}`](
      forStatementUpdate,
      mod,
      scope
    );
  } else {
    throw new VModError(
      forStatementUpdate.loc,
      "VanillaMod: IncompatibleStatementType. " +
        `The type ${forStatementUpdate.type} cannot be used as an updater in a for loop`
    );
  }

  // block statement
  const forStatementBodyCommand =
    `execute if entity ${LAST_SUCCESS_TRUE()} run ` +
    `${vMod.function(`${scope.mcFunctionPath}/body`).join(" ")}`;
  scope.statementContext = statementName;
  scope.mcFunctionName = "body";
  scope.mcFunctionContents = newJsonFile(
    forStatementFolder,
    "body",
    "mcfunction"
  ).contents;
  transpiler[`transpile${statement.body.type}`](statement.body, mod, scope);

  // lower/for-loop body
  scope.mcFunctionContents.push(forStatementUpdateCommand);
  scope.mcFunctionContents.push(forStatementConditionCommand);
  scope.mcFunctionContents.push(forStatementBodyCommand);

  // fix scope for later stuff
  scope.mcFunctionContents = oldMCFunctionContents;
  scope.mcFunctionPath = oldMCFunctionPath;
  scope.datapackFolder = oldDatapackFolder;
  scope.statementContext = oldContext;
  scope.mcFunctionName = oldContext;

  // upper main
  scope.mcFunctionContents.push(forLoopInitCommand);
  scope.mcFunctionContents.push(forStatementConditionCommand);
  scope.mcFunctionContents.push(forStatementBodyCommand);

  // kill variables created in init
  const blockScopeTag = `${forStatementMCFunctionPath.replace(
    /[:|/]/g,
    "."
  )}-depth-${scope.depth}`;
  const killInitVars = `kill @e[tag=${blockScopeTag}]`;
  scope.mcFunctionContents.push(killInitVars);
};

transpiler.transpileExpressionStatement = (statement, mod, scope) => {
  // function call -- technically var declaration is an expressionstatement too
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } expression statement`
  );

  // this looks wrong
  // debugPrint(statement.expression.type);
  if (transpiler.hasOwnProperty(`transpile${statement.expression.type}`)) {
    transpiler[`transpile${statement.expression.type}`](
      statement.expression,
      mod,
      scope
    );
  } else {
    throw new VModError(
      statement.loc,
      `Invalid expression type ${statement.expression.type}. It's possible what you're trying to do is not currently supported by VanillaMod`
    );
  }
};

transpiler.transpileCallExpression = (
  statement,
  mod,
  scope,
  isCondition = false
) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } function call (expression)`
  );

  // I have to do it like this until the validator works properly
  if (
    statement.callee.type === "MemberExpression" &&
    statement.callee.object &&
    statement.callee.object.name === "console"
  ) {
    if (statement.callee.property.name === "log") {
      const command = [
        "tellraw",
        "@p",
        minecraftPrintJSON(scope, statement.arguments),
      ];
      const validatedCommand = command.join(" ");
      debugPrint("scope: ", JSON.stringify(scope, null, 4));
      debugPrint(
        "command contents",
        scope.mcFunctionContents,
        "is it an array?:",
        Array.isArray(scope.mcFunctionContents),
        "typeof",
        typeof scope.mcFunctionContents
      );
      debugPrint(
        "The prototype of scope.mcfunctioncontents:",
        scope.mcFunctionContents.prototype
      );
      scope.mcFunctionContents.push(validatedCommand);
      return;
    }
    throw new VModError(
      statement.callee.property.loc,
      "Consoles are only good for logging. use console.log()"
    );
  }

  // declare calledfunctionname out here for when it is not a memberExpession
  if (statement.callee.type === "MemberExpression") {
    const validateObject = validator.validate(statement, scope.variables);
    debugPrint(`validateObject.valid: ${validateObject.valid}`);
    debugPrint("Validator threw no errors: pushing command");

    // debugPrint('scope: ', JSON.stringify(scope))
    // debugPrint('command contents', scope.mcFunctionContents)

    let validatedCommand = validateObject.command.join(" ");
    // console.log("here validate object", validateObject)
    // Used to simplify if statements
    if (isCondition) {
      debugPrint(`Adding conditional to command: ${validatedCommand}`);
      validatedCommand = `execute store success score @s vMod_LastSuccess run ${validatedCommand}`;
      return validatedCommand;
    }
    // debugPrint('scope: ', JSON.stringify(scope))
    // debugPrint('command contents', scope.mcFunctionContents)
    // console.log("here validated command", validatedCommand)
    scope.mcFunctionContents.push(validatedCommand);
  } else {
    // function *should* be user defined and should not have an object
    const calledFunctionName = snakeCaser(statement.callee.name);
    if (scope.variables.has(calledFunctionName)) {
      if (!statement.callee.object) {
        // something something do scoreboard stuff for parameters

        scope.mcFunctionContents.push(
          vMod
            .function(getMCFunctionPath(mod, calledFunctionName, "main"))
            .join(" ")
        );
      } else {
        throw new VModError(
          statement.loc,
          "User defined objects cannot call user defined functions." +
            "\nTry checking your spelling, otherwise ask for help on our Discord!"
        );
      }
    } else {
      throw new VModError(
        statement.loc,
        `There is no function with the name ${statement.callee.name}().` +
          "\nTry checking for spelling errors."
      );
    }
  }
};

transpiler.transpileUpdateExpression = (
  statementToTransform,
  mod,
  scope
) => {
  const transformedStatement = statementToTransform;
  // debugPrint('preTransformedStatement: ', transformedStatement);

  transformedStatement.type = "AssignmentExpression";
  transformedStatement.left = transformedStatement.argument;
  delete transformedStatement.argument;
  transformedStatement.right = {
    type: "Literal",
    value: 1,
    raw: "1",
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
      throw new VModError(
        statementToTransform.loc,
        `This kind of update operator is not supported, try ++ or --`
      );
  }

  transpiler.transpileAssignmentExpression(transformedStatement, mod, scope);
};

// NEEDS 1.13 HELP, LOOK IN SWITCH STATEMENT
transpiler.transpileAssignmentExpression = (statement, mod, scope) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } assignment expression`
  );
  const varName = statement.left.name;
  if (scope.variables.has(varName)) {
    let toBeAssigned = scope.variables.get(varName);
    fixIfNegativeNumber(statement.right);
    if (
      statement.right.type === "Literal" &&
      typeof statement.right.value === "number"
    ) {
      if (!toBeAssigned.defined) {
        scope.variables.set(
          varName,
          new vars.Integer(toBeAssigned, scope.mcFunctionContents)
        );
        const newInt = scope.variables.get(varName);
        const summonInteger = newInt.createInGameVariable();
        scope.mcFunctionContents.push(summonInteger);
      }
      toBeAssigned = scope.variables.get(varName);
      let editValue = "";
      switch (statement.operator) {
        case "=":
          if (statement.right.value == null) {
            editValue = `tag ${toBeAssigned.getVariable()} remove ${
              toBeAssigned.scopedTag
            }`;
          } else {
            editValue = `scoreboard players set ${toBeAssigned.getVariable()} ${STORE_VARIABLE_OBJECTIVE} ${
              statement.right.value
            }`;
          }
          break;
        case "+=":
          editValue = `scoreboard players add ${toBeAssigned.getVariable()} ${STORE_VARIABLE_OBJECTIVE} ${
            statement.right.value
          }`;
          break;
        case "-=":
          editValue = `scoreboard players remove ${toBeAssigned.getVariable()} ${STORE_VARIABLE_OBJECTIVE} ${
            statement.right.value
          }`;
          break;
        default:
          throw new VModError(
            statement.loc,
            `This kind of assignment expression is not supported, try =, +=, -=. ` +
            `Feel free to ask on discord to move up the importance of adding more operations!`
          );
      }
      scope.mcFunctionContents.push(editValue);
    } else if (statement.right.type === "NewExpression") {
      transpiler.transpileNewExpression(
        statement.right,
        mod,
        scope,
        statement.left.name
      );
    } else {
      throw new VModError(
        statement.right.loc,
        `Unsupported type. ${statement.right.type} cannot be used as part of an assignment expression`
      );
    }
  } else {
    throw new VModError(
      statement.left.loc,
      `variable: ${statement.left.name} is not declared or is out of scope`
    );
  }
};

// var testDrone = new vMod.Drone();
transpiler.transpileNewExpression = (statement, mod, scope, varName) => {
  // new object being declared
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${scope.index} new expression`
  );
  // PARAMS FIRST (when we have them)
  // technically we should also kill the old drones, but lazy for now
  if (isValidNewObject(statement)) {
    const newType = statement.callee.property.name;
    let firstArg = "No Name";
    const toBeDefined = scope.variables.get(varName);

    if (statement.arguments.length === 0 || statement.arguments[0]) {
      if (statement.arguments.length > 0) {
        if (typeof statement.arguments[0].value === "string") {
          firstArg = statement.arguments[0].value;
        } else {
          throw new VModError(
            statement.arguments[0].loc,
            "Constructor arguments must be strings"
          );
        }
      }

      if (vars[newType] && vars[newType].prototype.action) {
        scope.variables.set(
          varName,
          new vars[newType](firstArg, toBeDefined, scope.mcFunctionContents)
        );
        const entityObject = scope.variables.get(varName);

        if (
          toBeDefined.defined &&
          toBeDefined.variableType !== entityObject.variableType
        ) {
          throw new VModError(
            statement.loc,
            "Cannot redefine variables as a different type. " +
              `The variable ${varName} is already defined as a ${toBeDefined.variableType}`
          );
        }

        const createCommands = entityObject.createInGameVariable();

        if (scope.variables.has(statement.callee.object.name)) {
          const object = scope.variables.get(statement.callee.object.name);
          if (object.params) {
            if (
              statement.callee.property &&
              statement.callee.property.name === "setVariable"
            ) {
              // this area is to assign a living entity to a variable. How do?
              scope.variableCounter--;
            }
          } else {
            throw new VModError(
              statement.callee.loc,
              "Cannot do new expression with normal variables"
            );
          }
        } else {
          scope.mcFunctionContents.push(...createCommands);
          debugPrint(
            "NOT ARRAY, mcfunctioncontents:",
            scope.mcFunctionContents
          );
        }
      }

      // THERE WAS AMERGE CONFLICT HERE. I DON't KNOW WHAT THIS DOES
      // if (Array.isArray(createCommands)) {
      //   scope.mcFunctionContents.push(...createCommands)
      //   debugPrint('it was an array, mcfunctioncontents:', scope.mcFunctionContents)
    } else {
      throw new VModError(
        statement.callee.property.loc,
        `Unknown constructor: ${newType} try Drone() or Team()`
      );
    }
    // end isValidNewObject
  }
  // end function
};
// Need better error handling to complete below

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
transpiler.transpileBinaryExpression = (
  statement,
  mod,
  scope,
  getSimpleCommand = false
) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${scope.index} binary expression`
  );
  // assumes variable on the left

  const test = statement;
  if (test.left.type !== "Identifier") {
    throw new VModError(
      test.left.loc,
      "VanillaMod InvalidType. The left side of a math condition must be a variable"
    );
  }
  const leftVariableName = test.left.name;
  const leftVariable = scope.variables.has(leftVariableName)
    ? scope.variables.get(leftVariableName)
    : undefined;
  if (!leftVariable) {
    throw new VModError(
      test.left.loc,
      `ReferenceError. The variable ${leftVariableName} does not exist`
    );
  }
  if (leftVariable.variableType !== "int") {
    throw new VModError(
      test.left.loc,
      `VanillaMod TypeError. The variable ${leftVariableName} is not a number`
    );
  }

  test.right = fixIfNegativeNumber(test.right);

  if (test.right.type === "Identifier") {
    // execute store success score @s vMod_LastSuccess if score @e[tag=vMod_number,limit=1] vMod_Variable <= #TheNumberFive vMod_Variable
    const rightVariableName = test.right.name;
    const rightVariable = scope.variables.has(rightVariableName)
      ? scope.variables.get(rightVariableName)
      : undefined;

    if (!rightVariable) {
      throw new VModError(
        test.right.loc,
        `ReferenceError. The variable ${rightVariableName} does not exist`
      );
    }
    if (rightVariable.variableType !== "int") {
      throw new VModError(
        test.left.loc,
        `VanillaMod TypeError. The variable ${rightVariableName} is not a number`
      );
    }

    // change == or === to just = for minecraft
    const operator =
      test.operator === "==" || test.operator === "===" ? "=" : test.operator;

    const comparisonCommand =
      `execute store success score @s vMod_LastSuccess if score ${leftVariable.getVariable(
        true
      )} ` +
      `vMod_Variable ${operator} ${rightVariable.getVariable(
        true
      )} vMod_Variable`;

    // Used to simplify condition checks if they are simple
    if (getSimpleCommand) {
      return comparisonCommand;
    }
    scope.mcFunctionContents.push(comparisonCommand);
  } else if (
    test.right.type === "Literal" &&
    typeof test.right.value === "number"
  ) {
    const comparedInteger = test.right.value;
    let range = "..";
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
        throw new VModError(
          test.loc,
          `This kind of comparison is not supported, try ==, <, >, >=, <=. ` +
          `Feel free to ask on discord to move up the importance of adding more comparisons!`
        )
    }
    const comparisonCommand =
      `execute store success score @s vMod_LastSuccess if score ` +
      `${leftVariable.getVariable(true)} vMod_Variable matches ${range}`;

    // Used to simplify condition checks if they are simple
    if (getSimpleCommand) {
      return comparisonCommand;
    }
    scope.mcFunctionContents.push(comparisonCommand);
  } else {
    throw new VModError(
      test.right.loc,
      `VanillaMod InvalidType. ${JSON.stringify(
        test.right
      )} must be a variable or a number`
    );
  }
};

// bool1 || bool2 && bool3
transpiler.transpileLogicalExpression = (statement, mod, scope) => {
  // this one may be harder, look into 1s and 0s, adding them together, using % 2
  // this one gets funny with large numbers and > or <
  // figure out how to do without conditionals/scoreboard test?
  // probably not possible
  // scope.depth FIRST
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${scope.index} logical expression`
  );

  throw new VModError(
    statement.loc,
    "VanillaMod is not able to handle logical expressions right now"
  );
};

// testVar = otherVar;
transpiler.transpileIdentifier = (statement, mod, scope) => {
  // this is easy, check scope, and then... ?
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } simple assignment expression`
  );
};

transpiler.transpileLiteral = (statement, mod, scope) => {
  debugPrint(
    `${indenter(scope.depth)} ${scope.depth}:${
      scope.index
    } literal (found on its own?)`
  );
  throw new VModError(statement.loc, "Unused literal, try removing it");
};

// lots of console.log in here before, is it buggy?
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
  if (
    statement.callee.object.type !== "Identifier" ||
    statement.callee.property.type !== "Identifier"
  ) {
    return false;
  }
  if (
    statement.callee.object.name !== "vMod" ||
    statement.callee.object.name !== "mc"
  ) {
    return false;
  }
  return true;
}

function isValidNewObject(statement) {
  if (statement.callee.type !== "MemberExpression") {
    throw new VModError(
      statement.loc,
      "Creating new objects must look like this: new library.objectName(...)" +
        "\n(Not in MemberExpression format)"
    );
  }
  if (
    statement.callee.object.type !== "Identifier" ||
    statement.callee.property.type !== "Identifier"
  ) {
    throw new VModError(
      statement.loc,
      "Creating new objects must look like this: new library.objectName(...)" +
        "\n(Both sides of MemberExpression must be Identifiers)"
    );
  }
  if (statement.callee.object.name === "vMod") {
    if (statement.callee.property.name === "Drone") {
      return true;
    }
    throw new VModError(
      statement.callee.property.name,
      "The vMod library does not contain object type: " +
        `'vMod.${statement.callee.property.name}', try using vMod.Drone(...)`
    );
  }
  if (statement.callee.object.name === "mc") {
    if (statement.callee.property.name === "Team") {
      return true;
    }
    throw new VModError(
      statement.callee.property.name,
      "The mc library does not contain object type: " +
        `'mc.${statement.callee.property.name}', try using mc.Team(...)`
    );
  }
  throw new VModError(
    statement.callee.object.name,
    `The library or object: ${statement.callee.object.name} does not exist, ` +
      "try using mc. or vMod."
  );
}

function fixIfNegativeNumber(statement) {
  if (statement.type === "UnaryExpression" && statement.operator === "-") {
    const newStatement = statement.argument;
    if (
      newStatement.type === "Literal" &&
      typeof newStatement.value === "number"
    ) {
      newStatement.value *= -1;
      newStatement.raw = `-${newStatement.raw}`;
      return newStatement;
    }
    throw new VModError(
      statement.loc,
      "VanillaMod error. Negative signs can only be used with numbers"
    );
  }
  return statement;
}

function debugPrint(...args) {
  // if (process.env.ENVIRONMENT == 'dev') {
  // eslint-disable-next-line no-console
  console.log(...args);
  // }
}

// function modIdHasher(projectPrefix, functionName) {
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
  let indent = "";
  for (let i = 0; i < depth; i++) {
    indent += "    ";
  }
  return indent;
}

// move to variables or library-1-13.js
function minecraftPrintJSON(scope, args) {
  let tellrawJSON = '[""';
  args.forEach((argument) => {
    if (argument.type) {
      switch (argument.type) {
        case "Identifier":
          if (scope.variables.has(argument.name)) {
            const variableToPrint = scope.variables.get(argument.name);
            if (variableToPrint.defined) {
              if (variableToPrint.prettyJSON) {
                tellrawJSON += `,${variableToPrint.prettyJSON()}`;
              }
            } else {
              tellrawJSON += ',"undefined"';
            }
          } else {
            throw new VModError(
              argument.loc,
              `ReferenceError. ${argument.name} is undefined`
            );
          }
          break;
        case "Literal":
          tellrawJSON += `,"${argument.value}"`;
          break;
        default:
          throw new VModError(
            argument.loc,
            `VanillaMod InvalidType error. The argument type ${argument.type} cannot be used in a console.log`
          );
      }
    } else if (typeof argument === "string") {
      tellrawJSON += `,"${argument}"`;
    }
    tellrawJSON += '," "';
  });
  tellrawJSON += "]";
  return tellrawJSON;
}

function getMCFunctionPath(mod, calledFunction, mcFunctionName) {
  return `${mod.NAME}:${calledFunction}/${mcFunctionName}`;
}

function snakeCaser(str) {
  return str
    .replace(
      /([a-z])([A-Z]+)/g,
      (txt) =>
        `${txt.substring(0, 1).toLowerCase()}_${txt.substring(1).toLowerCase()}`
    )
    .replace(/ /g, "_")
    .toLowerCase();
}

function newStatementSubPath(codeLine, statementType) {
  return `line${pad("0000", codeLine)}_${statementType}`;

  function pad(paddingLeft, str, paddingRight) {
    // debugPrint('padding test of', str, 'with', paddingLeft+paddingRight);
    if (typeof str === "undefined") return paddingLeft || paddingRight;
    if (paddingLeft) {
      return (paddingLeft + str).slice(-paddingLeft.length);
    }
    return (str + paddingRight).substring(0, paddingRight.length);
  }
}

export default transpiler;

// }

// vMod quirks:
// considers every variable declaration as let i.e. all are block-scoped (unlike var) and all can be re-assigned (unlike const)
//
// if a variable is defined (assigned a new type) at runtime (so say "var red" is defined as a team in one function and a drone in the other),
// VanillaMod will pick the most recently defined type in the code by line, not by what actually happened in game. Basically, don't do that.
//
// globally/more-shallow declared variables cannot run/execute functions until they are defined in code
//
// Naming a function "main" does weird stuff
