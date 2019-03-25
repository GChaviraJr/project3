const router = require("express").Router();
const yelpController = require('../../controllers/yelpController')

module.exports = router

// Matches with "/api/selectedLocation"
router.route("/api/selectedLocation")
  yelpController.postSelectedLocation()
  yelpController.deleteSelectedLocation()

module.exports = router;