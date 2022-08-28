const express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password", async function (req, res) {
  const { name: username, email, password } = req.params;

  try {
    const foundUser = await User.findOne({
      email,
    });
    if (foundUser) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    console.log("me", user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );

    user.save();

    dal.create(user);

    console.log(user);
    res.send(user);
    // }
  } catch (err) {
    console.log("there was an error", err);
  }
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", async function (req, res) {
  try {
    const allOfThem = await dal.all();

    res.send(allOfThem);

    console.log(allOfThem);
  } catch (err) {
    console.log("the error", err);
  }
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
