const router = require("express").Router();
const yelpRestaurantsRoute = require("./yelpRestaurantsRoute");
const yelpSelectedLocationRoute = require('./yelpSelectedLocationRoute')

// API Routes
router.use("/restaurants", yelpRestaurantsRoute );
router.use("/selectedLocation", yelpSelectedLocationRoute)

module.exports = router;
