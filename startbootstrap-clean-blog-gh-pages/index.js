const express = require("express");
const app = express();
// const path = require("path");

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
