const router = require("express").Router();
const yelpController = require('../../controllers/yelpController')

module.exports = router

// Matches with "/api/restaurants"
router.route("/api/restaurants")
  yelpController.getRest()
  yelpController.clientSearch()
  yelpController.deleteRestaurant()

module.exports = router;
