if (process.env.NODE_ENV != "production") {
  require("dotenv/config");
}
// console.log(process.env.Cloud_NAME);
// console.log(process.env.Cloud_API_KEY);
// console.log(process.env.Cloud_API_SECRET);

const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

const ExpressError = require("./utils/ExpreesError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const signup = require("./routes/signUp.js");
const User = require("./models/user.js");

const DBURL = process.env.ATLUS_DB_URL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", engine);

main()
  .then(() => {
    console.log("connection is done");
  })
  .catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://wanderlust:wanderlust13579@wanderlust.3phqd3l.mongodb.net/"
    );
    console.log("server connection is successful");
  } catch (err) {
    console.log("server connection is failed", err);
  }
}

const store = MongoStore.create({
  mongoUrl: DBURL, // Fix: Changed MongoUrl to mongoUrl // Fix: Changed MongoUrl to mongoUrl
  crypto: {
    // Fix: Changed crypt to crypto{       // Fix: Changed crypt to crypto
    secret: "supersecreteode",
  },
  touchAfter: 24 * 3600,
});
store.on("error", function (e) {
  console.log("session store error", e);
});

const sessionOptions = {
  // Fix: Changed sessuionOption to sessionOptions  // Fix: Changed sessuionOption to sessionOptions
  store,
  secret: "supersecreteode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Fix: Changed expire to expires, // Fix: Changed expire to expires
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("./demo", async (req, res) => {
//   const fakeUser = new User({
//     email: "heeeloo@gamil.com",
//     username: "nihal",
//   });
//   User.register(fakeUser, "heelo");
// });
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", signup);

// app.get("/testlisting", async (req, res) => {
//   try {
//     // Create a new sample listing
//     const sampleListing = new Listings({
//       title: "Your Sample Listing",
//       description: "This is a sample description",
//       price: 1000,
//       location: "Sample Location",
//       country: "Sample Country",
//     });

//     // Save the sample listing to the database

//     await sampleListing.save();
//     console.log("sampleSave:", sampleListing);
//     // Send a response back to the client
//     res.send("Sample listing saved successfully!");
//   } catch (error) {
//     console.error("Error saving sample listing:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  console.log("errrrr", err);
  res.status(statusCode).render("error.ejs", { message });
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
