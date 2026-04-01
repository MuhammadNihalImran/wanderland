const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const initDataParams = require("./data.js");

const dbUrl = process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB successfully for seeding.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const seedDB = async () => {
  // Clear existing databases
  console.log("Clearing existing data...");
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({}); // Note: we clear everything entirely to seed fresh data!

  // 1. Create Dummy Users
  console.log("Creating dummy users...");
  const usersToCreate = [
    { email: "alice@example.com", username: "alicewonders", password: "password123" },
    { email: "bob@example.com", username: "builderbob", password: "password123" },
    { email: "carol@example.com", username: "caroltravels", password: "password123" },
    { email: "dave@example.com", username: "davedoes", password: "password123" },
    { email: "eve@example.com", username: "eveexplores", password: "password123" },
  ];

  const createdUsers = [];
  for (let u of usersToCreate) {
    const newUser = new User({ email: u.email, username: u.username });
    const registeredUser = await User.register(newUser, u.password);
    createdUsers.push(registeredUser);
  }

  // 2. Insert Dummy Listings with Random Owner and Reviews
  console.log("Injecting dummy listings with owners and comments...");
  const dummyComments = [
    "Absolutely breathtaking! Would highly recommend.",
    "Very clean and exactly as described.",
    "The host was very accommodating but the wifi was slow.",
    "Incredible location, we took so many pictures.",
    "A cozy retreat. Great value for the money.",
    "My family loved staying here.",
    "I wish I could live here forever!",
    "It was a bit noisy at night, but otherwise great.",
  ];

  for (let idx = 0; idx < initDataParams.data.length; idx++) {
    const listingData = initDataParams.data[idx];

    // Pick a random user to own this listing
    const randomOwner = createdUsers[Math.floor(Math.random() * createdUsers.length)];

    // Create new mongoose object
    const newListing = new Listing({
      ...listingData,
      owner: randomOwner._id,
    });

    // Create a random amount of reviews per listing (between 2 to 4)
    const numReviews = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numReviews; i++) {
      // Pick a random user to write the review
      const randomReviewer = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomComment = dummyComments[Math.floor(Math.random() * dummyComments.length)];
      const randomRating = Math.floor(Math.random() * 5) + 1; // 1 to 5 stars

      const newReview = new Review({
        comment: randomComment,
        rating: randomRating,
        author: randomReviewer._id,
      });

      const savedReview = await newReview.save();
      newListing.reviews.push(savedReview._id);
    }

    // Save listing with its references
    await newListing.save();
  }

  console.log("Database seeded successfully with users, reviews, and listings matching UI categories!");
  mongoose.connection.close();
};

// Fire the seeding process
seedDB();
