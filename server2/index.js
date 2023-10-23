// Creating a new server
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Starting");
  res.end("Hello Node");
});

server.listen(3000);
