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

//fetching baby data from database
router.get("/babiesList", async(req, res) => {
  try {
    let babies = await Babyregistration.find();
    res.render("viewdatapage", {babies:babies});
    console.log("display babies", babies);
  } catch (error) {
    res.status(400).send("unable to fetch babies from the database")
    console.log("Error fetching babies details from database", error);
  }
    
})

//deleting from the database usind a delete button in the table
router.post("/delete", async (req, res) => {
  try {
   await Babyregistration.deleteOne({_id:req.body.id});
    res.redirect("back");
  } 
  catch (error) {
    console.log("Error deleting baby", error);
    res.status(400).send("Unable to delete baby from the database");
  }
});

//updating a baby in the database from the table using the update link
router.get("/babiesUpdate/:id", async(req, res) => {
  try {
    const babyUpdate = await Babyregistration.findOne({_id:req.params.id});
    res.render("babyedit", {baby:babyUpdate});

  } catch (error) {
    console.log("Unable to find baby from the db!", error);
    res.status(400).send("Unable to find baby from the database");
  }
})

router.post("/babiesUpdate", async(req, res) => {
  try {
    await Babyregistration.findOneAndUpdate({_id: req.query.id}, req.body);
    res.redirect("/babiesList");
  } catch (error) {
    res.status(404).send("Unable to pdate baby in the database");

  }
})
module.exports = router;