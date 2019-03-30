const router = require("express").Router()
const uber = require("../../controllers/uberAPI.js")
const {deleteRequest, requestFromSandBox, searchProducts, requestToken, requestMe, refreshToken, getProducts, requestFare} = uber

router.get("/api/uber/products", function(req, res) {
    searchProducts(req, res)
})

router.post("/api/uber/postCode", function(req, res) {
    let theCode = req.body.params.code
    requestToken(theCode, requestMe, req, res)
})
router.post("/api/uber/requestProducts", function(req, res) {
    let theData = req.body.params
    refreshToken(theData, getProducts, req, res)
})
router.post("/api/uber/requestFare", function(req, res) {
    let theData = req.body.params
    refreshToken(theData, requestFare, req, res)
})
router.post("/api/uber/requestRide", function(req, res) {
    let theData = req.body.params
    refreshToken(theData, requestFromSandBox, req, res)
})
router.delete("/api/uber/deleteRequest", function(req, res) {
    let theData = req.body
    refreshToken(theData, deleteRequest, req, res)
})
module.exports = router

