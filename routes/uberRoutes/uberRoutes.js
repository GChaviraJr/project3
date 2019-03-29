const router = require("express").Router()
const uber = require("../../controllers/uberAPI.js")
const {searchProducts} = uber

router.get("/api/uber/products", function(req, res) {
    searchProducts(req, res)
})

module.exports = router