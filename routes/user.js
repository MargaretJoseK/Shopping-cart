var express = require("express");
var csrf = require("csurf");
var passport = require("passport");

var router = express.Router();

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

//routes to GET /user/profile
router.get("/profile", isLoggedIn, function(req, res, next) {
  res.render("user/profile");
});

//routes to GET /user/logout
router.get("/logout", isLoggedIn, function(req, res, next) {
  req.logout(); //paspport method
  res.redirect("/");
});

router.use("/", notLoggedIn, function(req, res, next) {
  next();
});

//routes to GET /user/signup and signup user

router.get("/signup", function(req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});
//routes to POST /user/signup and signup user

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureflash: true
  })
);

//router to get /user/sigin
router.get("/signin", function(req, res, next) {
  var messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

//routes to POST /user/signin

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureflash: true
  })
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
