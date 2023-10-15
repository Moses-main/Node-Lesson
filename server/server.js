const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// corsOptions()
app.use(cors(corsOptions));

// This middleware for handling url encoded data
// i.e. forma data
app.use(express.urlencoded({ extended: false }));

// middleware for json data
app.use(express.json());

// The middleware that handles static files
// like styles, images and javascript
app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/subdir", express.static(path.join(__dirname, "/public")));

// The route for the root repo
app.use("/", require("./routes/root"));
// route fo the registeration
app.use("/register", require("./routes/register"));

// // // route for the authentication
app.use("/auth", require("./routes/auth"));

// app.use("/subdir", require("./routes/subdir"));
app.use("/employee", require("./routes/api/employee"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.jsonp({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// The listener for the server
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
