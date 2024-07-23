const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initDB = require("./data.js");

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
    console.log("server connection is failed");
  }
}

const initData = async () => {
  await Listing.deleteMany({});
  initDB.data = initDB.data.map((obj) => ({
    ...obj,
    owner: "665735b9c0eeb2b1098f0fb2",
  }));

  await Listing.insertMany(initDB.data);
  console.log("initial data base");
};

initData();

// const initDB = async () => {
//   try {
//     // Delete existing listings
//     await Listings.deleteMany({});

//     // Insert sample data into the database
//     await Listings.insertMany(initDB.Data);

//     console.log("Initial data added to the database");
//   } catch (error) {
//     console.error("Error initializing database:", error);
//   }
// };

// // Call the initDB function
// initDB();
