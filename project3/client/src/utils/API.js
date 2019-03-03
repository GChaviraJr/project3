import axios from "axios";

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
};
