// // Creating a new server
// const http = require("http");
// // file system
// const fs = require("fs");
// const homePage = fs.readFileSync("index.html");
// const aboutPage = fs.readFileSync("about.html");
// const contactPage = fs.readFileSync("contact.html");
// const notFoundPage = fs.readFileSync("notfound.html");

// const app = http.createServer((req, res) => {
//   if (req.url === "/about") {
//     res.end(aboutPage);
//   } else if (req.url === "/") {
//     res.end(homePage);
//   } else if (req.url === "/contact") {
//     res.end(contactPage);
//   } else {
//     res.writeHead(404);
//     res.end(notFoundPage);
//   }
// });

// app.listen(3000);
// console.log("Server is running on port 3000");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Hello server is running on port 3000");
  res.send("hallo world");
});

app.listen(3000);
