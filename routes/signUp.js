const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const signupController = require("../controllers/signup.js");

router
  .route("/signup")
  .get(signupController.showSignupForm)
  .post(wrapasync(signupController.signup));

router
  .route("/login")
  .get(signupController.showLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    signupController.login
  );

router.get("/logout", signupController.logout);
module.exports = router;
