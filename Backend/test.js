const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "gfjgfhjhhkhgkhg67867867686()gggkk?[]uyuiyy68587587ghgg[]]fhfjgfj6786";
const mongoUrl = "mongodb+srv://dbuser:1234@cluster0.sq9rrxz.mongodb.net/test";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");


const getUserTweets = async () =>  {
    
        const User = mongoose.model("UserInfo");
      const cursor = User.toArray();
      // iterate code goes here
     for(var t=0;i<cursor.length;i++)
{
    console.log(cursor[i])
}
  }
  getUserTweets();
