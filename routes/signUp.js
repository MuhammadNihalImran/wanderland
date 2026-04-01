const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

const signupController = require("../controllers/signup.js");

router
  .route("/signup")
  .get(signupController.showSignupForm)
  .post(wrapAsync(signupController.signup));

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

router
  .route("/profile")
  .get(isLoggedIn, wrapAsync(signupController.renderProfile))
  .put(isLoggedIn, wrapAsync(signupController.updateProfile));

router.get("/profile/edit", isLoggedIn, signupController.renderEditProfile);

module.exports = router;
