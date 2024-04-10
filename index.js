//Dependencies
const express = require("express");
// const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

//Importing routes
const registrationRoutes = require("./routes/registrationRoutes");

//Instantiations
const app = express();

//Configurations
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });

app.set("view engine", "pug"); //set the view engine to pug
app.set("views", path.join(__dirname, "views")); //specifying the directory where the views are found

//Middleware
app.use(express.static(path.join(__dirname, "public")));//set directory for static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/registersitter", (req, res) => {
  res.render("register_sitter");
});
//use imported routes
app.use("/", registrationRoutes);

// app.get("/", (req, res) => {
//   res.send("Homepage! Hello world.");
// });

// app.get("/about", (req, res) => {
//   res.send("About page. Nice.");
// });

// //syntax of a route
// //app.METHOD(PATH, HANDLER);
// app.get("/course", (req, res) => {
//   res.send("You have hit the courses page");
// });

// // app.get('/books/:bookId', (req, res) => {
// //   res.send(req.params.bookId);
// //   console.log(req.params.bookId);
// // });

// // app.get('/students/:name', (req, res) => {
// //   res.send("This is my students name " + req.params.name);
// // });

// app.get("/students/:studentId", (req, res) => {
//   res.send("This is my students id " + req.params.studentId);
//   console.log("student Id " + req.params.studentId);
// });

// //query params
// app.get("/students", (req, res) => {
//   res.send("This is class " + req.query.class + "cohort " + req.query.cohort);
// });

// app.get("/babies", (req, res) => {
//   res.send("This is baby " + req.query.name + "age " + req.query.age);
// });

// //Serving html files
// app.get("/index", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/registerbaby", (req, res) => {
//   res.sendFile(__dirname + "/register_baby.html");
// });

// app.post("/registerbaby", (req, res) => {
//   console.log(req.body);
//   let baby = req.body;
//   // res.redirect("/index");
//   res.json({ message: "baby registered", baby });
// });

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});
// Bootstrapping the server (app.listen should always be the last line in your code)
app.listen(3000, () => console.log("listening on port 3000"));
