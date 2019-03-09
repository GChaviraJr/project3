const express = require('express';)
const router = require("express").Router();

module.exports = router

// Matches with "/api/books"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
