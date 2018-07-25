const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
//const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
require("express-validator");

const flash = require("connect-flash");
const User = require("../models/User");
//const keys = require("../config/keys");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "email",
      passworddField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      req
        .checkBody("email", "Invalid Email")
        .notEmpty()
        .isEmail();
      req
        .checkBody(
          "password",
          " Password should contain minimum of 4 characters."
        )
        .notEmpty()
        .isLength({ min: 4 });

      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function(error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("errors", messages));
      }
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log(user);
          return done(null, false, { message: "Email already exist" });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    }
  )
);

//sign in
passport.use(
  "local.signin",
  new localStrategy(
    {
      usernameField: "email",
      passworddField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      req
        .checkBody("email", "Invalid Email")
        .notEmpty()
        .isEmail();
      req
        .checkBody(
          "password",
          " Password should contain minimum of 4 characters."
        )
        .notEmpty();

      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function(error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("errors", messages));
      }
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log(user);
          return done(null, false, { message: "No user found" });
        }
        if (!user.valiPassword(password)) {
          return done(null, false, { message: "Wrong password" });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    }
  )
);
