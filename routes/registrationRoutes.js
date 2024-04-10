const express = require("express");
const router = express.Router();

// import model
const Babyregistration = require("../models/Babyregistration");

router.get("/registerbaby", (req, res) => {
  res.render("register_baby");
});

router.post("/registerbaby", (req, res) => {
  const baby = new Babyregistration(req.body);
  console.log(baby);
  baby.save();
});

module.exports = router;