"use strict";

var express = require('express');

require("dotenv").config();

var app = express();

var cors = require('cors');

var db = require("./models"); //controllers


var Auth = require("./api/auth");

var Pitch = require("./api/pitch");

var Bio = require("./api/bio");

var Idea = require("./api/ideas");

var User = require("./api/user");

var Stripe = require("./api/stripe"); //middleware for logging out if an incoming request


var logger = function logger(req, res, next) {
  console.log("incoming request");
  next();
}; //allowed origin which the server can accept request from


var corOption = {
  origin: "*"
}; //setting up cors

app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(logger); //static files ie profile pictures

app.use("./images", express["static"]("./images")); //routes

app.use("/auth", Auth);
app.use("/pitch", Pitch);
app.use("/bio", Bio);
app.use("/idea", Idea);
app.use("/user", User);
app.use("/stripe", Stripe);
var port = 3001; //attempting to connect to the database first before starting the server

db.sequelize.sync({
  logging: console.log,
  force: false
}).then(function () {
  console.log("Connection to the database established");
  app.listen(port, function () {
    console.log("running on port ".concat(port));
  });
})["catch"](function (err) {
  return console.log("Something went wrong ".concat(err));
});
//# sourceMappingURL=index.dev.js.map
