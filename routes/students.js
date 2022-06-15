var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require("../models/student.model");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("Students Route Work");
});

// Post

router.post("/add", (req, res) => {
  let newStudent = new StudentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    dob: req.body.dob,
    department: req.body.department,
  });
  console.log(newStudent);
  newStudent.save(function (err, newStudent) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        message: "User Added Successfully",
        studentObj: newStudent,
      });
    }
  });
});

// Get

router.get("/list", (req, res) => {
  StudentModel.find(function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        resultsFound: response.length,
        students: response,
      });
    }
  });
});

router.get("/searchByFirstName", (req, res) => {
  const firstNameQuery = req.query.firstName;
  StudentModel.find({ firstName: firstNameQuery }, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        resultsFound: response.length,
        students: response,
      });
    }
  });
});

router.get("/searchById", (req, res) => {
  const idQuery = req.query.id;
  StudentModel.findById(idQuery, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        status: 200,
        students: response,
      });
    }
  });
});

// Update

router.put("/update", (req, res) => {
  const department = req.query.department;
  StudentModel.update(
    { age: 18 },
    { department: department },
    function (err, response) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          status: 200,
          students: response,
        });
      }
    }
  );
});

router.put("/updateUSer", (req, res) => {
  const id = req.query.userId;
  const fName = req.query.firstName;
  StudentModel.findByIdAndUpdate(
    id,
    { firstName: fName },
    function (err, response) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          status: 200,
          students: response,
        });
      }
    }
  );
});

// Delete

router.delete("/deleteUSer", (req, res) => {
  const id = req.query.userId;
  const fName = req.query.firstName;
  StudentModel.findByIdAndDelete(
    id,
    { firstName: fName },
    function (err, response) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          status: 200,
          students: response,
        });
      }
    }
  );
});

module.exports = router;
