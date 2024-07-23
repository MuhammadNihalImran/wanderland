const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAcync = require("../utils/wrapasync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//review
router.post("/", isLoggedIn, validateReview, reviewController.createReview);
//Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAcync(reviewController.destroyReview)
);

module.exports = router;
