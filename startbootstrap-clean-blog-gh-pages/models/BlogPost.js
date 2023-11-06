const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
});

// const studentsSchema = new Schema({
//   name: String,
//   age: String,
//   dept: String,
//   reg_number: String,
//   faculty: String,
//   gender: String,
// });

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
// const Student = mongoose.model("Student", studentsSchema);

module.exports = { BlogPost };
