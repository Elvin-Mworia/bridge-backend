"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcrypt");

var _require = require("jsonwebtoken"),
    sign = _require.sign; //registering


var _require2 = require("../models"),
    Users = _require2.Users;

router.post("/register", function _callee2(req, res) {
  var _req$body, firstname, secondname, email, password, customer, price, plan;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, firstname = _req$body.firstname, secondname = _req$body.secondname, email = _req$body.email, password = _req$body.password, customer = _req$body.customer, price = _req$body.price;

          // console.log(price);
          if (price === "2" && customer === "investor") {
            plan = "bronze";
            console.log(plan);
          } else if (price === "5" && customer === "investor") {
            plan = "silver";
            console.log(plan);
          } else if (price === "10" && customer === "investor") {
            plan = "gold";
            console.log(plan);
          } else {
            plan = null;
          } // const lastname=req.body.lastname;
          // const investor=req.body.investor;
          // const entreprenuer=req.body.entreprenuer;
          //     const email=req.body.email;
          //    const password=req.body.password;
          //     const firstname=req.body.firstname;
          //  console.log(password);
          //  console.log(email);
          //  console.log(username);


          try {
            bcrypt.hash(password, 10).then(function _callee(hash) {
              var newUser, user, _newUser, _user;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(Users.findAll({
                        where: {
                          email: email
                        }
                      }));

                    case 3:
                      _context.t0 = _context.sent;

                      if (!(_context.t0 === "true")) {
                        _context.next = 8;
                        break;
                      }

                      res.json("Another account was registered with the email");
                      _context.next = 22;
                      break;

                    case 8:
                      if (!(customer === "investor")) {
                        _context.next = 16;
                        break;
                      }

                      newUser = {
                        firstname: firstname,
                        lastname: secondname,
                        email: email,
                        password: hash,
                        customer: customer,
                        plan: plan
                      };
                      _context.next = 12;
                      return regeneratorRuntime.awrap(Users.create(newUser));

                    case 12:
                      user = _context.sent;
                      res.json({
                        message: "Thank ".concat(user.firstname, " for registering")
                      });
                      _context.next = 22;
                      break;

                    case 16:
                      _newUser = {
                        firstname: firstname,
                        lastname: secondname,
                        email: email,
                        password: hash,
                        customer: customer
                      };
                      console.log(_newUser);
                      _context.next = 20;
                      return regeneratorRuntime.awrap(Users.create(_newUser));

                    case 20:
                      _user = _context.sent;
                      res.json({
                        message: "Thank ".concat(_user.firstname, " for registering")
                      });

                    case 22:
                      _context.next = 27;
                      break;

                    case 24:
                      _context.prev = 24;
                      _context.t1 = _context["catch"](0);
                      console.log("another account was registered with the email,use another email please!");

                    case 27:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 24]]);
            });
          } catch (err) {
            console.log(err);
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logging in

router.post("/login", function _callee3(req, res) {
  var _req$body2, email, password, user, correctPassword;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          user = _context3.sent;
          console.log(user);

          if (user == null || user == undefined) {
            res.send({
              message: "Username or email was not found"
            });
          }

          correctPassword = user.password;
          bcrypt.compare(password, correctPassword).then(function (match) {
            try {
              if (!match) {
                res.send({
                  message: "Wrong email and password combination",
                  status: 301
                });
                console.log("logging in failed,try again!");
              }

              var accessToken = sign({
                username: user.email,
                id: user.id
              }, "ec0d54fd-d72e-4a53-aa72-b8ceabd148af");
              res.json({
                accessToken: accessToken,
                message: "Logged in successfully",
                username: user.firstname,
                status: "200",
                customer: user.customer,
                user: user
              });
              console.log(accessToken);
              console.log("logged in successfully.");
            } catch (err) {
              console.log("logging in failed,try again!");
            }
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
