const express = require("express");
const studentRouter = require("./Routers/studentRouter");
const booksRouter = require("./Routers/booksRouter");
const cors = require("cors");
const app = express();

// Body Parser Middlewere
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
  console.log("server started");
});

//Routers
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/books", booksRouter);
