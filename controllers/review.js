const Listings = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res, next) => {
  try {
    let listing = await Listings.findById(req.params.id).populate("reviews");

    // Check if user has already left a review
    const hasReviewed = listing.reviews.some(r => r.author.equals(req.user._id));
    if (hasReviewed) {
      req.flash("error", "You have already left a review for this listing!");
      return res.redirect(`/listings/${listing._id}`);
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.destroyReview = async (req, res) => {
  console.log("helo");
  let { id, reviewId } = req.params;
  await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};

module.exports.renderEditReview = async (req, res) => {
  let { id, reviewId } = req.params;
  const listing = await Listings.findById(id);
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }
  res.render("reviews/edit.ejs", { listing, review });
};

module.exports.updateReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
  req.flash("success", "Review Updated Successfully!");
  res.redirect(`/listings/${id}`);
};
