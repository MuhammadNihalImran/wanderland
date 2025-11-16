const Listings = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listings.find({});

  res.render("listings/index.ejs", { allListings });
};
module.exports.showForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showAllListings = async (req, res) => {
  let { id } = req.params;
  const Listing = await Listings.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!Listing) {
    req.flash("error", "Listing you requested for does not exit!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { Listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "...", filename);
    let newListing = new Listings(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    console.log(url, "...", filename);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/Listings");
  } catch (err) {
    console.log("errrror", err);
  }
};

module.exports.showEditForm = async (req, res) => {
  let { id } = req.params;
  const Listing = await Listings.findById(id);
  if (!Listing) {
    req.flash("error", "Listing you requested for does not exit!");
    return res.redirect("/listings");
  }
  let original_url = Listing.image.url;
  original_url = original_url.replace("/upload", "/upload/h_250,w_250");
  res.render("listings/edit.ejs", { Listing, original_url });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listings.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  // Agar user ne naya image upload kiya ho
  if (req.file) {
    listing.image = {
      url: req.file.path, // 👈 Cloudinary ka URL
      filename: req.file.filename, // 👈 Cloudinary ka filename
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listings.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/Listings");
};
