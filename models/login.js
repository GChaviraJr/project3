const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  hash: String,
  date: { type: Date, default: Date.now }
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;

