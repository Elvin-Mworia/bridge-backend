"use strict";

var router = require('express').Router();

var _require = require("../models"),
    Ideas = _require.Ideas;

var _require2 = require("../models"),
    IdeasBought = _require2.IdeasBought;

var axios = require("axios");

var LocalDateTime = require("@js-joda/core").LocalDateTime;

var mysql = require('mysql2'); //create an idea 


router.post("/create", function _callee(req, res) {
  var data, pitch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // image:req.file.path;
          data = {
            pitcherid: req.body.pitcherid,
            pitch: req.body.pitch,
            price: req.body.price,
            time: LocalDateTime.now().toString()
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Ideas.create(data));

        case 3:
          pitch = _context.sent;
          res.json({
            pitch: pitch,
            message: 'pitch created'
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //getting all ideas on first page render

var sequelize = require("sequelize");

var res = require('express/lib/response');

router.get("/", function _callee2(req, res) {
  var listofideas;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Ideas.findAll({
            order: [[sequelize.literal("updatedAt")]]
          }));

        case 2:
          listofideas = _context2.sent;

          if (listofideas == null) {
            res.json("no ideas have been added!");
          }

          res.send(listofideas.reverse());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //get a specific idea bought

router.get("/ideasbought/:id", function _callee3(req, res) {
  var id, Id, pitch;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          Id = id.substr(1, id.length);
          console.log(Id);
          _context3.next = 6;
          return regeneratorRuntime.awrap(IdeasBought.findAll({
            where: {
              customerid: Id
            }
          }));

        case 6:
          pitch = _context3.sent;
          res.json(pitch);
          console.log(pitch);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.log("dont panick but it seems the the id was not submitted");

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
}); //inner join for finding ideas bought by a customer

router.get("/ideascustomer/:id", function _callee4(req, res) {
  var id, Id, ideas;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          Id = id.substr(1, id.length);
          _context4.next = 4;
          return regeneratorRuntime.awrap(Ideas.findAll({
            include: [{
              model: IdeasBought,
              required: true,
              where: {
                customerid: Id
              }
            }]
          }));

        case 4:
          ideas = _context4.sent;
          res.json(ideas);
          console.log(ideas);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //get a specific idea from database

router.get("/ideas/:id", function _callee5(req, res) {
  var id, Id, Idea;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          Id = id.substr(1, id.length);
          console.log(Id);
          _context5.next = 6;
          return regeneratorRuntime.awrap(Ideas.findAll({
            where: {
              id: Id
            }
          }));

        case 6:
          Idea = _context5.sent;
          res.json(Idea);
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //route to update ideasbought table

router.post("/bought", function _callee6(req, res) {
  var data, pitch;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // image:req.file.path;
          data = {
            IdeaId: req.body.ideaid,
            customerid: req.body.customerid,
            time: LocalDateTime.now().toString()
          };
          _context6.next = 3;
          return regeneratorRuntime.awrap(IdeasBought.create(data));

        case 3:
          pitch = _context6.sent;
          res.json({
            pitch: pitch,
            message: 'pitch created'
          });

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=ideas.dev.js.map
