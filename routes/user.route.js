const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express();





userRouter.post("/signup", async (req, res) => {
  const {email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const newUser = new userModel({email, password: hash });
      await newUser.save();
      res.status(200).send("user registered sucessfully");
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});




userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        
        if(result){
            res
              .status(200)
              .send({
                msg: "login success",
                token: jwt.sign({ userId: user._id }, process.env.secretKey),
              })
        }else{
            res.status(400).send("login failed");
        }
      });
    } else {
      res.status(400).send("login failed");
    }
  } catch (error) {
    res.status(400).send(error.messsage);
  }
});







module.exports = userRouter;
