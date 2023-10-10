// // importing the custom module and not an npm module or comical module

const logEvent = require('./logEvent');

const EventEmitter = require('events');

class myEmitter extends EventEmitter {};

// initialize the object that would be used

const MyEmitter = new myEmitter();

// add an event listener
// MyEmitter.on("log", (msg)=> logEvent(msg));

setTimeout(() => {
    MyEmitter.emit("log", "log event emitted")
}, 3000);


console.log("log event emitted")