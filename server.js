const express = require("express");

const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models/index");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const auth = require('./controllers/authorization');
const yelpAPI = require('./controllers/yelpController')
// const routes = require('./routes')

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://mongo/nightowl");

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.get('/api/restaurants', (req, res) => {yelpAPI.getRest(req, res)})
app.post('/api/restaurants', (req, res) => {yelpAPI.clientSearch(req, res)})
app.post("/api/selectedLocation", (req, res) => {yelpAPI.postSelectedLocation(req, res)})
app.delete("/api/selectedLocation", function(req, res) {yelpAPI.deleteSelectedLocation(req, res)})
app.delete("/api/restaurants/", function(req, res) {yelpAPI.deleteRestaurant(req, res)})

// app.use(routes)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT 3001!`);
});
