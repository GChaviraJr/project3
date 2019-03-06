const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/"
);

const usersSeed = [
  {
    name: "lupe",
    email: "lupec_lmt@yahoo.com",
    password: "test",
    entries: "5",
    date: new Date(Date.now())
  }
];

const loginSeed = [
  {
    hash: "$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u",
    email: "lupec_lmt@yahoo.com"
  }
];

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Login
  .remove({})
  .then(() => db.Login.collection.insertMany(loginSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
