const mongoose = require("mongoose");
const { BlogPost, Student } = require("./models/BlogPost");
// // Replace 'your_database_url' with your actual MongoDB connection string
const dbURL = "mongodb://localhost/Dozens";
// connecting to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Area to fill in the student section

BlogPost.create({
  title: "The Alchemist",
  body: "This is the story of the Adventurer that went to search for how to turn articles to gold to money.",
});

Student.create({
  name: "Sunday Moses",
  gender: "male",
  age: "24",
  dept: "Computer Science",
  reg_number: "20201237802",
  faculty: "SICT",
});

// BlogPost.create(
//   {
//     title: "The Mythbuster's Guide to Saving Money on Energy Bills",
//     body: "If you have been here a long time, you might remember when i went on ITV TOnight to dispense a masterclass in saving money on energy bills/. Energy-savings is one of my favorite nerdery topics, because once you get past the boring bullets-points lists, a whole new world of thrifty nerdery opens up. You know those bullets-points lists. You start spotting them everything at this time of years. They go like this:",
//   }
//   );
