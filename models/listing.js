const mongoose = require("mongoose");
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v,
    },
    filename: String,
  },

  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      "Trending", "Mountains", "Beaches", "Camping", "Parks",
      "Cities", "Lakes", "Winter", "Rooms", "Iconic Cities",
      "Castles", "Amazing Pools", "Farms", "Arctic", "Domes", "Boats"
    ],
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    try {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
    } catch (err) {
      console.error("Error deleting reviews:", err);
    }
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
