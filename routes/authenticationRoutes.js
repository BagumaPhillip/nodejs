const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    
    if (req.user.role == "admin") {
      res.redirect("/admindash");
    } 
    else if (req.user.role == "sitter") {
      res.redirect("/sitterdash");
    }
    else {
      res.send("You do not have a role in the system");
    }
  }
);

//mentor session example
// creating roles
// const roles= {
//   admin : "admin",
//   sitter : "sitter"
// }

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (req, res) => {
//     req.session.user = req.user;
//     const userRole = roles[req.user.role];

//     if (userRole == "admin") {
//       res.redirect("/registerbaby");
//     } else (userRole == "sitter");
//     {
//       res.redirect("/registerbaby");
//     }
//   }
// );

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send("Error logging out.");
      }
      res.redirect("/login");
    });
  }
});

// dashboard routes
router.get("/admindash", (req, res) => {
  res.render("admindashboard");
});
  router.get("/sitterdash", (req, res) => {
    res.render("sitterdashboard");
});
module.exports = router;
