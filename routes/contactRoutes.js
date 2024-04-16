const express = require("express");//introduce express
const router = express.Router();//accessing the router function in express

// import model
const Contact = require("../models/class");

//Creating the route
router.get("/contact", (req, res) => {
    res.render("class");//you render a file and if you use redirect you put a path
})
