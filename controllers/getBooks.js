const knex = require("../db/db");

exports.addBooks = (req, res) => {
  console.log(req.body);
  if (req.body.book_name === undefined || req.body.author_name === undefined) {
    res.status(400).json({
      status: "error",
      msg: "Please enter a valid data!",
    });
  } else {
    console.log("yes");
    knex("books")
      .insert({
        author_name: req.body.author_name,
        book_name: req.body.book_name,
        borrowed_by: req.body.borrowed_by,
        date_of_borrow: req.body.date_of_borrow,
        date_of_return: req.body.date_of_return,
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
exports.AllBooks = async (req, res) => {
  try {
    const data = await knex.select("*").from("books");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.deleteBooks = async (req, res) => {
  try {
    const data = await knex
      .select("*")
      .from("books")
      .where("book_name", req.body.book_name)
      .where("author_name", req.body.author_name);
    if (data.length == 0) throw new Error("No Data Found");
    else {
      const x = await knex("student")
        .delete()
        .where("book_name", req.body.book_name)
        .where("author_name", req.body.author_name);
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
exports.updateBooks = async (req, res) => {
  try {
    if (
      req.body.book_name === undefined ||
      req.body.author_name === undefined ||
      req.body.new_book_name === undefined ||
      req.body.new_author_name === undefined
    ) {
      throw new Error("Enter valid data");
    }
    const data = await knex("student")
      .update({
        book_name: req.body.new_book_name,
        author_name: req.body.new_author_name,
        borrowed_by: req.body.borrowed_by,
        date_of_borrow: req.body.date_of_borrow,
        date_of_return: req.body.date_of_return,
      })
      .where("book_name", req.body.book_name)
      .where("author_name", req.body.author_name);
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
