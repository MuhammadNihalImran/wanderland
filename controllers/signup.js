const User = require("../models/user.js");
const Listing = require("../models/listing.js");

module.exports.showSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new User({ username, email });
    const registerUser = await User.register(newuser, password);
    // console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};
module.exports.showLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust");
  // console.log("heelo");
  let redirectUrl = req.locals.redirectUrl || "/listings";
  // console.log(redirectUrl);
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", " you are logged out!");
    res.redirect("/listings");
  });
};

module.exports.renderProfile = async (req, res) => {
  const user = req.user;
  const listings = await Listing.find({ owner: user._id });
  res.render("users/profile.ejs", { user, listings });
};

module.exports.renderEditProfile = (req, res) => {
  res.render("users/editProfile.ejs", { user: req.user });
};

module.exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.user._id);
  user.username = username;
  user.email = email;
  await user.save();

  // Refresh login session with new details to prevent Passport de-sync
  req.login(user, err => {
    if (err) return next(err);
    req.flash("success", "Profile updated successfully!");
    res.redirect("/profile");
  });
};
