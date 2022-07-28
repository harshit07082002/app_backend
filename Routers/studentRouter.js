const express = require("express");
const studentRouter = express.Router();
const StudentController = require("../controllers/getStudents");

studentRouter.route("/").post(StudentController.addStudents);
studentRouter.route("/").get(StudentController.AllStudents);
studentRouter.route("/").delete(StudentController.deleteStudent);
studentRouter.route("/update").post(StudentController.updateStudent);

module.exports = studentRouter;
