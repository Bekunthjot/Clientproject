const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  type: String,
  password: String,
  twitid: String,
  linkid: String,
  credit: String,
  arri:Array,
});

const AdminDetailsScehma = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  type: String,
  password: String,
  users: Array,
});
const User = mongoose.model("UserInfo", UserDetailsScehma);
const Admin = mongoose.model("AdminInfo", AdminDetailsScehma);

module.exports = {
  User,
  Admin,
};
