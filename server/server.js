const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// ----------------------------------------------------------------
// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
// The urls that the server would allow to access the backend
const whitelist = [
  "https://www.yoursite.com",
  "https://www.index.com",
  "http://127.0.0.1:5500",
  "loocalhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      // let err  = new Error("Not allowed to access")
      // console.log(err);
      callback(new Error("Not allowed to access"));
    }
  },
  optionSuccessStatus: 200,
};
// corsOptions()
app.use(cors(corsOptions));

// Middleware Types
// 1 Built-in middleware
// 2 Custom middleware
// 3 Third party middleware

// This middleware is responsible
// for handling url encoded data
// i.e. forma data

app.use(express.urlencoded({ extended: false }));
// middleware for json data
app.use(express.json());

// The middleware that handles static files
// like styles, images and javascript
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// The route for the root repo
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
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
