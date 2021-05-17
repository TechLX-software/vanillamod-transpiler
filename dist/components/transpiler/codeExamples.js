"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var helloWorld = {
  title: "Hello World",
  code: "// Prints \"Hello World\" when you run this function in Minecraft\n\nfunction sayHello() {\n    console.log(\"Hello World!\");\n}\n"
};
var simpleErrorMessage = {
  title: "Error Message",
  code: "// Displays an error message when you try downloading.\n\nfunction begin() {\n    notExistentFunction();\n}\n"
};
var droneSetblock = {
  title: "Drone Setblock",
  code: "// A drone will place a gold block when you run this function\n\nfunction dronePlaceGold() {\n    let myDrone = new vMod.Drone();\n    myDrone.setblock(\"~ ~ ~\", \"gold_block\");\n}\n"
};
var examples = [helloWorld, simpleErrorMessage, droneSetblock];
var _default = examples;
exports.default = _default;

//# sourceMappingURL=codeExamples.js.map