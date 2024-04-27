const express = require("express"); //introduce express
const router = express.Router(); //accessing the router function in express

// import model
const Contact = require("../models/contact");

//Creating the route
router.get("/contact", (req, res) => {
  res.render("contact"); //you render a file and if you use redirect you put a path
});

//posting the post route
router.post("/contact", async(req, res) => {
  try{
      const contact = new Contact(req.body);
      await contact.save();
      console.log(req.body);
      res.redirect("/contact");
  }
  catch(error){
      console.log("error");
  }
});

module.exports = router;
