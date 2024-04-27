const express = require("express"); //introduce express
const router = express.Router(); //accessing the router function in express

// import model
const AdminReg = require("../models/Register");

//Creating the route
router.get("/Adminregister", (req, res) => {
  res.render("adminreg"); //you render a file and if you use redirect you put a path
});

//posting the post route
router.post("/Adminregister", async (req, res) => {
  console.log(req.body);
  try {
    const adminreg = new AdminReg(req.body);
    await AdminReg.register(adminreg, req.body.password, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/Adminregister");
    });
  } catch (error) {
    res.status(400).send("Registration Failed");
    console.log(error);
  }
});

module.exports = router;
