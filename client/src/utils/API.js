import axios from "axios";

const BASEURL = "https://api.yelp.com/v3/businesses/search";
const APIKEY = "eGyFYoGa3oYrHwELLpuXsE9A1l9W6d6AoJszCKMPa3M9SNgR2kx1md-nelFS1jJdfOb1sCD3knBmuWA7kDTZSoZMehkn0-Avx1VDY6QMhAX45RpIuKyxSBZ53eTsW3Yx";

export default {
  // Gets all login's
  getLogins: function() {
    return axios.get("/api/login");
  },
  // Gets the login with the given id
  getLogin: function(id) {
    return axios.get("/api/login/" + id);
  },
  // Deletes the login with the given id
  deleteLogin: function(id) {
    return axios.delete("/api/login/" + id);
  },
  // Saves a login to the database
  saveLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(usersData) {
    return axios.post("/api/users", usersData);
  },
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};



// Export an object with a "search" method that searches the Giphy API for the passed query
