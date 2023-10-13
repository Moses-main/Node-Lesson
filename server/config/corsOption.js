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
      callback(new Error("Not allowed to access"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
