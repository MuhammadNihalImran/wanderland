const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingController.createListing)
  );

//search suggestions route
router.get("/search/suggestions", wrapAsync(listingController.getSearchSuggestions));

//create new listing
router.get("/new", isLoggedIn, listingController.showForm);

//show route

router
  .route("/:id")
  .get(wrapAsync(listingController.showAllListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // 👈 multer add karo
    validateListings,
    wrapAsync(listingController.editListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//create edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.showEditForm)
);

//edit and save route

//delete route

module.exports = router;
