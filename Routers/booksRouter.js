const express = require("express");
const booksRouter = express.Router();
const BooksController = require("../controllers/getBooks");

booksRouter.route("/").post(BooksController.addBooks);
booksRouter.route("/").get(BooksController.AllBooks);
booksRouter.route("/").delete(BooksController.deleteBooks);
booksRouter.route("/update").post(BooksController.updateBooks);

module.exports = booksRouter;
