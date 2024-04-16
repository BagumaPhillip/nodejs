const express = require("express");
const router = express.Router();

// import model
const Babyregistration = require("../models/Babyregistration");

router.get("/registerbaby", (req, res) => {
  res.render("register_baby");
});

router.post("/registerbaby", async (req, res) => {
  try {
    const baby = new Babyregistration(req.body);
    console.log(baby);
    await baby.save();
    res.redirect("/registerbaby");
    // res.send("Baby successfully registered"); 
    //choose one between res.redirect and res.send. They dont work together
  } 
  catch (error) {
    res.status(400).send("sorry, something went wrong!");
    console.log("Error registering baby", error);
  }

});

module.exports = router;