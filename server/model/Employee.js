const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
