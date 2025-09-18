const safeFlash = (req, type, message) => {
  if (req.session) {
    if (typeof req.flash === "function") {
      req.flash(type, message);
    } else {
      req.session[`flash_${type}`] = message;
    }
  }
};

module.exports = safeFlash;
