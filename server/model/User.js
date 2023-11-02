const mongoose = require("mongoose");
// const Employee = require("./Employee");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    length: 10,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password:{
    type: String,
    required: true,
  },
  rereshToken:String


  address: {
    type: String,
    required: false,
  },
  phone: {
    type: varchar,
    length: 11,
    require: false,
  },
});

module.exports = mongoose.model("User", userSchema);
