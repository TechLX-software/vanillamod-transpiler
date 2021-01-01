const helloWorld = {
  title: "Hello World",
  code:
`// Prints "Hello World" when you run this function in Minecraft

function sayHello() {
  console.log("Hello World!");
}
`
}

const simpleErrorMessage = {
  title: "Simple Error Message",
  code:
`// Display an error message

function begin() {
  notExistentFunction();
}
`
}

const examples = [helloWorld, simpleErrorMessage];

export default examples;