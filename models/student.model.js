const mongoose = require("mongoose");

var studentsSchema = mongoose.Schema({
  studentId: Number,
  firstName: String,
  lastName: String,
  age: Number,
  dob: String,
  department: String,
});

var StudentModel = mongoose.model("Student", studentsSchema);

module.exports = StudentModel;
