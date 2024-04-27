const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// import model
const Sitterregistration = require("../models/Register");

router.get("/registersitter", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("register_sitter");
});

router.post("/registersitter", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const sitter = new Sitterregistration(req.body);
    console.log(sitter);
    await Sitterregistration.register(sitter, req.body.password, (err) => {
        if (err) {
          throw err;
        }
        res.redirect("/registersitter");
      });
  } 
  catch (error) {
    res.status(400).send("sorry, something went wrong!");
    console.log("Error registering sitter", error);
  }
});

//fetching sitter data from database
router.get("/sittersList", async(req, res) => {
  try {
    let sitters = await Sitterregistration.find({role:"sitter"});
    res.render("sitterdatapage", {sitters:sitters});
    console.log("display sitters", sitters);
  } catch (error) {
    res.status(400).send("unable to fetch sitters from the database")
    console.log("Error fetching sitters details from database", error);
  }
    
})

//deleting from the database usind a delete button in the table
router.post("/deletesitter", async (req, res) => {
  try {
   await Sitterregistration.deleteOne({_id:req.body.id});
    res.redirect("back");
  } 
  catch (error) {
    console.log("Error deleting sitter", error);
    res.status(400).send("Unable to delete sitter from the database");
  }
});

//updating a sitter in the database from the table using the update link
router.get("/sittersUpdate/:id", async(req, res) => {
  try {
    const sitterUpdate = await Sitterregistration.findOne({_id:req.params.id});
    res.render("sitteredit", {sitter:sitterUpdate});

  } catch (error) {
    console.log("Unable to find sitter from the db!", error);
    res.status(400).send("Unable to find sitter from the database");
  }
})

router.post("/sittersUpdate", async(req, res) => {
  try {
    await Sitterregistration.findOneAndUpdate({_id: req.query.id}, req.body);
    res.redirect("/sittersList");
  } catch (error) {
    res.status(404).send("Unable to update sitter in the database");

  }
})
module.exports = router;