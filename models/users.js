const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  entries: String,
  date: { type: Date, default: Date.now }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
