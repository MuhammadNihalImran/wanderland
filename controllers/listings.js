const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const { category, search } = req.query; // Extracts category and search from query string
  let queryObject = {};

  if (category) {
    queryObject.category = category;
  }

  if (search) {
    const regex = new RegExp(search, 'i'); // Case-insensitive
    queryObject.$or = [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { location: { $regex: regex } },
      { category: { $regex: regex } }
    ];
  }

  // MongoDB Query Example
  const allListings = await Listing.find(queryObject);

  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.json({ allListings, filterCategory: category, searchQuery: search });
  }

  res.render("listings/index.ejs", { allListings, filterCategory: category, searchQuery: search });
};

module.exports.getSearchSuggestions = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json({ suggestions: [] });

  const regex = new RegExp(query, 'i'); // Case-insensitive regex

  // Find listings matching title, category, or location
  const listings = await Listing.find({
    $or: [
      { title: { $regex: regex } },
      { category: { $regex: regex } },
      { location: { $regex: regex } }
    ]
  }).limit(8);

  // Format into a unique set of suggestions
  let suggestionsMap = new Map();

  listings.forEach(listing => {
    if (listing.title && listing.title.match(regex) && !suggestionsMap.has(listing.title)) {
      suggestionsMap.set(listing.title, { text: listing.title, type: "Title" });
    }
    if (listing.category && listing.category.match(regex) && !suggestionsMap.has(listing.category)) {
      suggestionsMap.set(listing.category, { text: listing.category, type: "Category" });
    }
    if (listing.location && listing.location.match(regex) && !suggestionsMap.has(listing.location)) {
      suggestionsMap.set(listing.location, { text: listing.location, type: "Location" });
    }
  });

  const suggestions = Array.from(suggestionsMap.values()).slice(0, 8);
  res.json({ suggestions });
};
module.exports.showForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showAllListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exit!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { Listing: listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "...", filename);
    let newListing = new Listing(req.body.listing);
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
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exit!");
    return res.redirect("/listings");
  }
  let original_url = listing.image.url;
  original_url = original_url.replace("/upload", "/upload/h_250,w_250");
  res.render("listings/edit.ejs", { Listing: listing, original_url });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
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
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/Listings");
};
