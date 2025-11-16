const express = require("express");
const router = express.Router();

const wrapAcync = require("../utils/wrapasync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAcync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListings,
    wrapAcync(listingController.createListing)
  );

//create new listing
router.get("/new", isLoggedIn, listingController.showForm);

//show route

router
  .route("/:id")
  .get(wrapAcync(listingController.showAllListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // 👈 multer add karo
    validateListings,
    wrapAcync(listingController.editListing)
  )
  .delete(isLoggedIn, isOwner, wrapAcync(listingController.destroyListing));

//create edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAcync(listingController.showEditForm)
);

//edit and save route

//delete route

module.exports = router;
