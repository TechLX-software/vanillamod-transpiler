//Library (bad name, rename this)
const vMod = {};

// var prefix = ''; //'minecraft:'

// vMod.spigotPrefix = function(usePrefix) {
//   if (usePrefix == 'true') {
//     prefix = 'minecraft:'
//   }
//   else {
//     prefix = ''
//   }
// }

//These need to be executes at some point because 1.13 is weird
//Also these are functions of drones/entities, and should be described as such
vMod.turnLeft = function() {
  return ['teleport', '@s', `~ ~ ~ ~-90 ~`]
}

vMod.turnRight = function() {
  return ['teleport', '@s', `~ ~ ~ ~90 ~`]
}

vMod.turnAround = function() {
  return ['teleport', '@s', `~ ~ ~ ~180 ~`]
}

vMod.moveForwards = function(distance) {
  return ['teleport', '@s', `^ ^ ^${distance}`]
}

vMod.moveBackwards = function(distance) {
  return ['teleport', '@s', `^ ^ ^-${distance}`]
}

vMod.moveUp = function(distance) {
  return ['teleport', '@s', `~ ~${distance} ~`]
}

vMod.moveDown = function(distance) {
  return ['teleport', '@s', `~ ~-${distance} ~`]
}

vMod.moveLeft = function(distance) {
  return ['teleport', '@s', `^${distance} ^ ^`]
}
//vMod.moveLeft.argTypes = ['integer']

vMod.moveRight = function(distance) {
  return ['teleport', '@s', `^-${distance} ^ ^`]
}

vMod.moveNorth = function(distance) {
  return ['teleport', '@s', `~ ~ ~-${distance}`]
}

vMod.moveSouth = function(distance) {
  return ['teleport', '@s', `~ ~ ~${distance}`]
}

vMod.moveEast = function(distance) {
  return ['teleport', '@s', `~${distance} ~ ~`]
}

vMod.moveWest = function(distance) {
  return ['teleport', '@s', `~-${distance} ~ ~`]
}

vMod.moveTo = function(destinationEntityOrCoords) {
  return ['execute', 'at', destinationEntityOrCoords, 'run', 'tp', '@s', '~ ~ ~']
}

vMod.teleportTo = function(destinationEntityOrCoords) {
  return ['teleport', '@s', destinationEntityOrCoords]
}

//just appends the command inside to the mcfunction
vMod.command = function(fullCommand) {
  console.log('ARGS OF COMMAND:', fullCommand)
  //validate if string or esprima literal object
  if (fullCommand.charAt(0) == '/') {
    return fullCommand.slice(1);
  }
  return fullCommand;
}

vMod.executeCallback = function(context, conditions, outputs, callbackArgs, runCommandDefinition) {
  //validate each one

  //if the first three args are strings, do this, if they're made of JSON do a something else at some point?
  let splitContext = (typeof context === 'string') ? splitContext = context.split(' ') : context
  let splitConditions = (typeof conditions === 'string') ? splitConditions = conditions.split(' ') : conditions
  let splitOutputs = (typeof outputs === 'string') ? splitOutputs = outputs.split(' ') : outputs

  return ['execute'].concat(splitContext, splitConditions, splitOutputs, ['run', runCommandDefinition], callbackArgs)
}

vMod.executeShort = function(executeAsEntity, commandToBeExecuted) {
  return ['execute', 'as', executeAsEntity, 'at', '@s', 'run'].concat(commandToBeExecuted);
}
//vMod.executeShort.argTypes = [['selector', 'string', 'entity-var'], ['string']]

//function <name>
vMod.mcfunction = function(path) {
  //consider writing parser here instead?
  return ['function', path]
}
vMod['function'] = vMod.mcfunction;

/*
team add <team> [<displayname>]
team empty <team>
team join <team> [<members>]
team leave <members>
team list [<team>]
team option <team> <option> <value> */
vMod.team = function(action, teamName, param1, optionValue) {
  if (teamName.charAt(0) == '@') { //checks if team entry is variable.
    teamName = teamName.slice(teamName.indexOf('=')+1, -1);
    //Will need to this more extensively when teams are changed to tags
  }
  return ['team', action, teamName, param1, optionValue];
}

// vMod.print = function(...args) {
// eventually do a tellraw thing here
// }

export default vMod;