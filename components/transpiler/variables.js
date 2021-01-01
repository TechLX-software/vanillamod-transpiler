const vars = {}

import vMod from './library-1-13.js'

// var USER_NAME = 'testUser'
// var PROJECT_NAME = 'testProjectName'
//var PROJECT_TAG = 'vMod-' + PROJECT_NAME
const AEC_DATATAGS = 'NoGravity:1b,Duration:2147483647,'
const AEC_ENTITY = 'minecraft:area_effect_cloud'

vars.initialize = function (mod) {
  // USER_NAME = user
  // //PROJECT_NAME = project
  // PROJECT_TAG = projectTag
  vars.mod = mod
}

vars.Declared = class {
  constructor (varName, funcName, depth, path, line, column, _isParam, isDefined = false) {
    this.varName = varName
    this.functionName = funcName
    this.depth = depth
    this.functionPath = path
    this.lineNum = line
    this.columnNum = column
    this.isParam = _isParam
    this.defined = isDefined
  }
}

//change this garbage to JSON objects at some point

vars.Variable = class extends vars.Declared {
  //needs constructor, hasAction, and scope

  //possibly replace with UUID retrival at some point?
  constructor (declarator, variableType, mcFunctionContents) {
    super(...Object.values(declarator))
    this.defined = true
    console.log('Making a variable!')
    //this.varName = declarator.varName
    //this tag stuff should be replaced with UUID referencing at some point
    this.scopeID = 'var-' + declarator.varName + '-line-' + declarator.lineNum + '-column-' + declarator.columnNum
    const pathTemp = declarator.functionPath
    this.blockScope = pathTemp.replace(/[:|/]/g, '.')+'-depth-'+declarator.depth
    this.entityType = AEC_ENTITY //is overwritten in classes like Drone if a different entity is desired
    this.variableType = variableType
    if (variableType == 'team') {
      this.reference = this.varName
      this.selectorType = 'team'
    } else {
      this.selectorType = 'tag'
      this.reference = vars.mod.TAG + '-' + this.scopeID
    }
    if (declarator.defined) {
      mcFunctionContents.push(this.clearReference())
    }
  }

  getVariable (limit = false) {
    //may be able to remove this line once teams are working smoothly
    //many commands require a single entity
    const optionalLimiter = (this.variableType == 'drone' || limit ? ',limit=1' : '')
    return `@e[${this.selectorType}=${this.reference}${optionalLimiter}]`
  }
}

vars.Drone = class extends vars.Variable {

  constructor (entityType, declarator, mcFunctionContents) {
    console.log('Creating a drone!')
    vars.mod.addDependency('drone-summon')
    super(declarator, 'drone', mcFunctionContents)
    if (!entityType) {
      this.entityType = AEC_ENTITY
    }
    //add the new rotation stuff
    this.droneName = this.varName
    this.canExecuteCommands = true
    this.isUserConstructed = true
  }

  action (commandToBeRun) {
    var selector = '@e[tag=' + this.reference + ']'
    return vMod.executeShort(selector, commandToBeRun)
  }

  clearReference () {
    return `kill @e[${this.selectorType}=${this.reference}]`
  }

  //repetitive, keep DRY when properly refactored
  createInGameVariable() {
    const entityName = `${this.variableType}-${this.varName}`
    const dataTags = '{CustomName:"\\\"' + entityName + '\\\"",' + AEC_DATATAGS + 'Tags:["' + vars.mod.TAG + '","' + this.blockScope + '","' + this.reference + '","VanillaMod-newDroneReferencer"]}'
    //console.log('getting args for ', entityName)

    return [`summon ${this.entityType} ~ ~ ~ ${dataTags}`, `function vanillamod-library:drone-summon`]
  }

  prettyJSON() {
    return `{"selector":"${this.getVariable()}"}`
  }
}

vars.Team = class extends vars.Variable {
  constructor (displayName, declarator, mcFunctionContents) {
    super(declarator, 'team', mcFunctionContents)
    this.displayName = displayName
    this.canExecuteCommands = true
    this.isUserConstructed = true
  }

  action (functionName, args) {
    //should I be doing the checking (hasAction) in here?
    const selector = '@e[team=' + this.reference + ']'
    return vMod.executeShort(selector, [functionName].concat(args))
  }

  clearReference () {
    return `team remove ${this.varName}`
  }

  //createTeam
  createInGameVariable () {
    return `team add ${this.varName} ${this.displayName}`
  }

  prettyJSON() {
    return `{"selector":"${this.getVariable()}"}`
  }
}

vars.Integer = class extends vars.Variable {
  constructor (declarator, mcFunctionContents) {
    super(declarator, 'int', mcFunctionContents)
  }

  clearReference() {
    return `kill ${this.getVariable()}`
  }

  createInGameVariable() {
    const entityName = `${this.variableType}-${this.varName}`
    const dataTags = '{CustomName:"\\\"' + entityName + '\\\"",' + AEC_DATATAGS + 'Tags:["' + vars.mod.TAG + '","' + this.blockScope + '","' + this.reference + '"]}'
    //console.log('getting args for ', entityName)

    return `summon ${this.entityType} ~ ~ ~ ${dataTags}`
  }

  prettyJSON() {
    return `{"score":{"name":"${this.getVariable()}","objective":"vMod_Variable"}}`
  }
}

vars.Function = class {
  constructor (name, params) {
    //['vMod-'+mod.NAME+'-'+newFunctionName, mod.TAG]
    this.defined = true
    this.functionName = name
    this.tag = `${vars.mod.TAG}-${this.functionName}`
    //this.tags = tags
    this.variableType = 'Function'
    this.entityType = AEC_ENTITY
    //rotate on summon so facing same as player? (for drone left/right)
  }

  getSelector() {
    return '@e[tag=' + this.tag + ',limit=1]'
  }

  createInGameVariable() {
    const entityName = `${this.variableType}-${this.functionName}`
    const dataTags = '{CustomName:"\\\"' + entityName + '\\\"",' + AEC_DATATAGS + 'Tags:["' + vars.mod.TAG + '","' + this.tag + '"]}'
    //console.log('getting args for ', entityName)

    return `summon ${this.entityType} ~ ~ ~ ${dataTags}`
  }

  prettyJSON() {
    return `"${this.functionName} has a last success of: ",{"score":{"name":"${this.getSelector()}","objective":"vMod_LastSuccess"}}`
  }

  createClickableFunctionChatJSON(mod, functionName) {
    const runFunction = vMod.function(getMCFunctionPath(mod, functionName, 'run')).join(' ')
    const tellrawJSON = `["",{"text":"${(mod.initFunctionsList.length + 1)}: ","bold":true},{"text":"${functionName}","color":"blue","underlined":true,`
      +`"clickEvent":{"action":"run_command","value":"/${runFunction}"},"hoverEvent":{"action":"show_text","value":`
      +`{"text":"","extra":[{"text":"Click me to run the function /${runFunction} from ${mod.NAME}"},`
      +`{"text":"\\nShift click to get command in chat for copying"}]}},"insertion":"/${runFunction}","bold":false},`
      +`{"text":" --- ","bold":true},{"text":" Get command block.","color":"blue","underlined":true,`
      +`"clickEvent":{"action":"run_command","value":"/give @p command_block`
      +`{display:{Name:\\"Runs: ${functionName}\\",Lore:[\\"From the VanillaMod: ${mod.NAME}\\"]},BlockEntityTag:{Command:\\"${runFunction}\\"}}"},`
      +`"hoverEvent":{"action":"show_text","value":`
      +`{"text":"","extra":[{"text":"Click me to get a command block that runs ${functionName}"}]}}}]`

    return tellrawJSON;
  }
}

function getMCFunctionPath(mod, calledFunction, mcFunctionName) {
  return mod.NAME+':'+calledFunction+'/'+mcFunctionName;
}

export default vars;