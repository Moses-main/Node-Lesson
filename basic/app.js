// console.log("Hello world!");

// ES Javascript importing
// import { object or function} from './(filename)

// Common Javascript import
// require('object')
const os = require("os");
const path = require("path");

// calling the functions inside the module
const {add, subtract, divide, multiply} = require("./math");

console.log(add(2, 2));
console.log(subtract(2, 2));
console.log(divide(2, 2));
console.log(multiply(2, 2));


const {great} = require('./math');
great();