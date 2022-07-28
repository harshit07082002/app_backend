const knex = require("../db/db");

exports.addStudents = (req, res) => {
  console.log(req.body);
  req.body.first_name.trim();
  req.body.last_name.trim();
  if (req.body.first_name === undefined || req.body.last_name === undefined) {
    res.status(400).json({
      status: "error",
      msg: "Please enter a valid data!",
    });
  } else {
    knex("student")
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      })
      .then(() => {
        res.json({ success: true, message: "ok" }); // respond back to request
      })
      .catch((error) => {
        res.status(400).json({
          status: "Error",
          error,
        });
      });
  }
};
exports.AllStudents = async (req, res) => {
  try {
    const data = await knex.select("*").from("student");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const data = await knex
      .select("*")
      .from("student")
      .where("first_name", req.body.first_name.trim())
      .where("last_name", req.body.last_name.trim());
    if (data.length == 0) throw new Error("No Data Found");
    else {
      const x = await knex("student")
        .delete()
        .where("first_name", req.body.first_name.trim())
        .where("last_name", req.body.last_name.trim());
      res.status(200).json({
        status: "success",
        message: "data deleted succesfuly",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    if (
      req.body.first_name === undefined ||
      req.body.last_name === undefined ||
      req.body.new_first_name === undefined ||
      req.body.new_last_name == undefined
    ) {
      throw new Error("Enter valid data");
    }
    const data = await knex("student")
      .update({
        first_name: req.body.new_first_name.trim(),
        last_name: req.body.new_last_name.trim(),
      })
      .where("first_name", req.body.first_name.trim())
      .where("last_name", req.body.last_name.trim());
    if (data == 0) {
      throw new Error("no data found!");
    } else {
      res.status(200).json({
        status: "success",
        msg: "updated succesfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
