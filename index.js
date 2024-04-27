// Dependencies
const express = require("express"); // Importing the express framework
const mongoose = require("mongoose"); // Importing the mongoose library for MongoDB
const path = require("path"); // Importing the built-in path module for working with file paths
const passport = require("passport");

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

require("dotenv").config(); // Load environment variables from a .env file into process.env

//Import adminreg model with user details
const Reg = require("./models/Register");

// easy way to set the port we are using. It is used in the app.listen at the bottom
const port = 3000;

// Importing routes
const registrationRoutes = require("./routes/babyregistrationRoutes"); // Importing the registrationRoutes module
const contactRoutes = require("./routes/contactRoutes");
const accRoutes = require("./routes/CreateAccountRoutes");
const authRoutes = require("./routes/authenticationRoutes");
const indRoutes = require("./routes/indexRoutes");
const sitregRoutes = require("./routes/sitterregRoutes");

// Instantiations
const app = express(); // Creating an instance of an Express application

// Configurations
// Connecting to the MongoDB database using the connection string stored in environment variables
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event handlers for MongoDB connection
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open"); // Log a message when the connection is open
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`); // Log an error message if there is a connection error
  });

// Setting up Express application configurations
app.set("view engine", "pug"); // Set the view engine to pug for rendering views
app.set("views", path.join(__dirname, "views")); // Specify the directory where the views are found

//MIDDLEWARE setup
app.use(express.static(path.join(__dirname, "public"))); // Set directory for static files (e.g., CSS, JS, images)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data from incoming requests
app.use(express.json()); // Parse JSON data from incoming requests

// express session configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configurations
passport.use(Reg.createStrategy());
passport.serializeUser(Reg.serializeUser());
passport.deserializeUser(Reg.deserializeUser());

// Routes setup
// Use the imported registration routes for requests starting with "/baby"
app.use("/", registrationRoutes);
app.use("/", contactRoutes);
app.use("/", authRoutes);
app.use("/", accRoutes);
app.use("/", indRoutes);
app.use("/", sitregRoutes);

// Commented-out routes (for demonstration purposes):
// These routes handle HTTP GET requests to different paths. You can uncomment them to use them in your application.
/*
app.get("/", (req, res) => {
  res.send("Homepage! Hello world.");
});

app.get("/about", (req, res) => {
  res.send("About page. Nice.");
});

app.get("/registersitter", (req, res) => {
  res.render("register_sitter");
});

// Route handling for specific paths with different methods
app.get("/course", (req, res) => {
  res.send("You have hit the courses page");
});

// Route handling with parameters (e.g., bookId)
app.get('/books/:bookId', (req, res) => {
  res.send(req.params.bookId);
  console.log(req.params.bookId);
});

// Handling routes with parameters (e.g., student's name)
app.get('/students/:name', (req, res) => {
  res.send("This is my student's name " + req.params.name);
});

app.get("/students/:studentId", (req, res) => {
  res.send("This is my student's id " + req.params.studentId);
  console.log("student Id " + req.params.studentId);
});

// Handling routes with query parameters (e.g., class and cohort)
app.get("/students", (req, res) => {
  res.send("This is class " + req.query.class + " cohort " + req.query.cohort);
});

app.get("/babies", (req, res) => {
  res.send("This is baby " + req.query.name + " age " + req.query.age);
});

// Serving HTML files
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/registerbaby", (req, res) => {
  res.sendFile(__dirname + "/register_baby.html");
});

app.post("/registerbaby", (req, res) => {
  console.log(req.body);
  let baby = req.body;
  // res.redirect("/index");
  res.json({ message: "baby registered", baby });
});
*/

// Route for handling invalid URLs (404 Not Found)
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL."); // Respond with a 404 message for invalid URLs
});

// Starting the server (this should always be the last line in your code)
// Listen for incoming requests on port 3000 and log a message when the server starts
app.listen(port, () => console.log(`Listening on port ${port}`));
