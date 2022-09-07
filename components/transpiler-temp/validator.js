import commandTree from "./resources/1-13-commands.json";
import vMod from "./library-1-13";

const validator = {};

const commandValidator = commandTree.children;

function debugPrint(...args) {
  if (typeof process !== "undefined" && process.env.ENVIRONMENT === "dev") {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}
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

validator.validate = function (statement, inGameVars) {
  debugPrint(
    "================================================ validate() ================================================"
  );
  // const minecraftCommand = command[0];
  const command = [];
  function init() {
    debugPrint("--------------- setup() --------------");
    debugPrint(statement);

    // <<<<<<< HEAD
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
    const propertyName = statement.callee.property.name;
    const objectName = statement.callee.object.name;
    if (objectName === "vMod") {
      if (vMod[propertyName] && typeof vMod[propertyName] === "function") {
        if (propertyName === "command") {
          if (
            statement.arguments[0] &&
            statement.arguments[0].type == "Literal"
          ) {
            return vMod.command(statement.arguments[0].value);
          }
          throw new VModError(
            statement.loc,
            "vMod.command() should only have a single string as an argument"
          );
        }
        return checkCommand(
          commandValidator,
          vMod[propertyName](...statement.arguments)
        );
      }
      throw new VModError(
        statement.callee.property.loc,
        "The vMod library does not contain the function: " +
          `'${statement.callee.property.name}', if it's a vanilla minecraft command use mc. otherwise check your spelling`
      );
    } else if (objectName == "mc") {
      if (commandValidator[propertyName]) {
        return checkCommand(commandValidator, [
          propertyName,
          ...statement.arguments,
        ]);
      }
      throw new VModError(
        statement.callee.property.loc,
        "There is no vanilla minecraft command for: " +
          `'${statement.callee.property.name}', if it's a custom vanillamod function use vMod. otherwise check your spelling`
      );
    } else if (inGameVars.has(objectName)) {
      const object = inGameVars.get(objectName);
      if (object.defined) {
        if (object.canExecuteCommands) {
          // const commandToBeRun = validator(restOfCallExpressionJSON)

          // const variableAction = object.action(commandToBeRun)
          // return variableAction
          const args = statement.arguments;

          const func = vMod[propertyName];
          // check to see if action is a vanillamod custom
          if (func && typeof func === "function") {
            if (args.length == func.length) {
              for (let i = 0; i < args.length; i++) {
                args[i] = parseArg(args[i]);
                if (!args[i].valid) return args[i];
                args[i] = args[i].argument;
              }
              return checkCommand(
                commandValidator,
                object.action(func(...args))
              );
            }
            throw new VModError(
              statement.loc,
              `Function "${propertyName}()" requires ${func.length} parameters. ${args.length} arguments were passed`
            );
          } else {
            // action is a default minecraft command
            return checkCommand(
              commandValidator,
              object.action([propertyName, ...args])
            );
          }

          // } else {
          //   return {
          //       valid: false,
          //       error: `${propertyName} is not a predefined function/property for object "${objectName}", options include: ${Object.keys(vMod)} (some functions in this list are not valid including: escapeQuotes, spaceCleaner, doEscaping, etc.)`
          //     }
          // }
          // return checkCommand(commandValidator, validator.command = vMod.executeShort(objectName, [propertyName, ...statement.arguments]))
        } else {
          throw new VModError(
            statement.callee.property.loc || statement.loc,
            `The function: ${propertyName} does not exist for object: ${objectName}`
          );
          // return {
          //   valid: false,
          //   location: statement.callee.property.loc || statement.loc || 'unknown',
          //   error:
          // }
          // addError(statement.loc, 'The function: ' + calledFunctionName + ' does not exist for object: ' + objectName);
        }
      } else {
        throw new VModError(
          statement.callee.object.loc || statement.loc,
          `The variable "${objectName}" exists but is undefined. Make sure you set the variable equal to something.`
        );
      }
    } else {
      throw new VModError(
        statement.callee.object.loc || statement.loc,
        `There is no variable with the name "${objectName}" Check to see if it is mispelled or out of scope.`
      );
    }
  }
  const obj = {
    ...init(),
    command,
  };

  if (obj.valid) {
    return obj;
  }
  throw new VModError(
    obj.location,
    `VanillaMod Source Error - Could not validate "${statement.callee.object.name}.${statement.callee.property.name}"` +
      "\nPlease share your code in our discord so we can fix this bug!"
  );

  // return checkCommand(commandValidator, statement.callee.object.name == 'vMod' ? statement.arguments : vMod.executeShort(statement.callee.object.name, statement.arguments))
  // return checkCommand(commandValidator[command].hasOwnProperty('children') ? commandValidator[command].children : commandValidator[commandValidator[command].redirect[0]].children, statement.arguments)

  /**
   * Checks if argument is valid, then parses it
   *
   * @Param: <argument> argument to be parsed
   * @Return: returns object with properties <valid> whether or not argument is valid, <error> error message if arguement is not valid, and <arguement> parsed argument if valid
   */
  function parseArg(argument) {
    let parsedArg = "";

    if (typeof argument === "object") {
      if (argument.type == "Identifier") {
        if (inGameVars.has(argument.name)) {
          const argVar = inGameVars.get(argument.name);
          if (argVar.varName && argVar.defined) {
            parsedArg = argVar.getVariable();
          } else {
            throw new VModError(
              argument.loc || statement.loc,
              `Tried to add following var as param and failed: ${argVar}. Maybe it is undefined?`
            );
          }
        } else {
          throw new VModError(
            argument.loc || statement.loc,
            `The variable ${argument.name} does not exist. Check to see if it is mispelled or out of scope.`
          );
        }
      } else if (argument.type == "Literal") {
        if (typeof argument.value === "string") {
          parsedArg = argument.value.trim();
        } else {
          parsedArg = argument.value;
        }
        // fix negative number for UnaryExpression
      } else if (argument.type == "TemplateLiteral") {
        parsedArg = argument.quasis[0].value.cooked;
      } else {
        throw new VModError(
          argument.loc || statement.loc,
          `Invalid argument type. ${argument.type} cannot be used as an argument of this function.` +
            "\nUse strings, numbers, and variables only"
        );
      }
    } else {
      parsedArg = argument;
    }
    return {
      valid: true,
      argument: parsedArg,
    };
  }
  /**
   * Checks Commands for its ability to execute
   *
   * @Param: <currentProperty> contains the remaining posibilities in the command in an object, <remainingArgs> contains the remaining unprocessed arguments in an array
   * @Return: returns object that contains valid boolean and error message
   */
  function checkCommand(currentProperty, remainingArgs) {
    debugPrint(
      "----------------------------- checkCommand() -----------------------------"
    );
    debugPrint(`remainingArgs: ${remainingArgs}`);
    debugPrint(currentProperty);
    // list of properties in current object
    const keys = Object.keys(currentProperty);
    const argument = remainingArgs[0];
    let parsedArg = parseArg(argument);
    if (!parsedArg.valid) return parsedArg;
    parsedArg = parsedArg.argument;

    command.push(parsedArg);

    // if current objects properties are of type "literal" or type "argument" by checking the first property (assuming that all properties are of the same type)
    if (currentProperty[keys[0]].type == "literal") {
      // Checks for valid argument
      if (parsedArg in currentProperty) {
        debugPrint("remainingArgs[0] in currentProperty");
        return checkLastArg(parsedArg);
      }
      let options = "";
      debugPrint("keys", keys);
      for (const key of keys) {
        options += ` "${key}"`;
      }
      throw new VModError(
        argument.loc || statement.loc,
        `Invalid Argument: "${parsedArg}" is not a valid argument in this command.` +
          `\nTry one of these instead:${options}`
      );
    } else if (currentProperty[keys[0]].type == "argument") {
      debugPrint("argument");
      debugPrint(`keys.length > 1: ${keys.length > 1}, keys: [${keys}]`);
      // Checks if there is more that one property in current object
      if (keys.length > 1) {
        if (remainingArgs.length > 1) {
          // Checks all properties in current object for children
          for (const key of keys) {
            if ("children" in currentProperty[key]) {
              // don't bother with depth-first to check each child option, there's only ever one that matters.
              return checkCommand(
                currentProperty[key].children,
                remainingArgs.slice(1)
              );
            }
          }
          throw new VModError(
            remainingArgs[1].loc.start &&
            remainingArgs[remainingArgs.length - 1].loc.end
              ? {
                  start: remainingArgs[1].loc.start,
                  end: remainingArgs[remainingArgs.length - 1].loc.end,
                }
              : statement.loc,
            "Command not valid, Too many arguments " +
              `(${
                currentProperty[parsedArg].executable
                  ? "Command is executable"
                  : "Command is not executable"
              })`
          );
        } else {
          debugPrint("remainingArgs.length is less than 1");
          // Checks if any properties in current object are executable
          for (const key of keys) {
            if (currentProperty[key].executable) {
              return {
                valid: true,
                error: "none",
              };
            }
          }
          throw new VModError(
            argument.loc || statement.loc,
            "Command is not executable, not enough arguments. Check the documentation to see what you missed."
          );
        }
      } else {
        return checkLastArg(keys[0]);
      }
    } else {
      throw new VModError(
        argument.loc || statement.loc,
        `"${currentProperty[keys[0]].type}" is not a "literal" or "argument",` +
          "Check the documentation to see what you missed"
      );
    }

    /**
     * Created to reduce redundancy, checks for last argument and executes appropriately
     *
     * @Param <key> describes the key of the target property of the current object
     */
    function checkLastArg(key) {
      debugPrint(
        "----------------------------- checkLastArg() -----------------------------"
      );
      const currentPropKey = currentProperty[key];
      debugPrint(`Arguements left to process: ${remainingArgs.length}`);
      if (remainingArgs.length > 1) {
        debugPrint(
          `Current Property has children: ${"children" in currentPropKey}`
        );
        if ("children" in currentPropKey) {
          return checkCommand(currentPropKey.children, remainingArgs.slice(1));
        }
        if ("redirect" in currentPropKey) {
          debugPrint("redirect");
          return checkCommand(
            commandValidator[currentPropKey.redirect[0]].children,
            remainingArgs.slice(1)
          );
        }
        if (argument === "run") {
          return checkCommand(commandValidator, remainingArgs.slice(1));
        }
        throw new VModError(
          remainingArgs[1].loc.start &&
          remainingArgs[remainingArgs.length - 1].loc.end
            ? {
                start: remainingArgs[1].loc.start,
                end: remainingArgs[remainingArgs.length - 1].loc.end,
              }
            : statement.loc,
          `Command not valid, Too many arguments (${
            currentPropKey.executable
              ? "Command is executable"
              : "Command is not executable"
          })`
        );
      } else {
        const valid = currentPropKey.executable;

        debugPrint(`valid: ${valid}`);
        if (valid) {
          return {
            valid: true,
            error: "none",
          };
        }
        throw new VModError(
          statement.loc,
          "Command is not executable, not enough arguments"
        );
      }
    }
  }
};

export default validator;
