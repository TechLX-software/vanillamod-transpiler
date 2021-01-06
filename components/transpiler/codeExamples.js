const helloWorld = {
  title: "Hello World",
  code: `// Prints "Hello World" when you run this function in Minecraft

function sayHello() {
    console.log("Hello World!");
}
`,
};

const simpleErrorMessage = {
  title: "Error Message",
  code: `// Displays an error message when you try downloading.x

function begin() {
    notExistentFunction();
}
`,
};

const droneSetblock = {
  title: "Drone Setblock",
  code: `// A drone will place a gold block when you run this function

function dronePlaceGold() {
    let myDrone = new vMod.Drone();
    myDrone.setblock("~ ~ ~", "gold_block");
}
`,
};

const examples = [helloWorld, simpleErrorMessage, droneSetblock];

export default examples;
