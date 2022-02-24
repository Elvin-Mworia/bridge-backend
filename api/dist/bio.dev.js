"use strict";

var router = require('express').Router();

var _require = require("../models"),
    Bio = _require.Bio;

router.patch("/update/:id", function _callee(req, res) {
  var id, Id, data, updated;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          Id = id.substr(1, id.length);
          data = {
            email: req.body.email,
            profilepicture: req.file.file,
            entreprenuerid: Id,
            contact: req.body.contact,
            city: req.body.city,
            county: req.body.county,
            country: req.body.country,
            socialmedia: req.body.socialmedia
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(Bio.update(data, {
            where: {
              entreprenuerid: Id
            }
          }));

        case 5:
          updated = _context.sent;
          res.json({
            updated: updated
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id", function _callee2(req, res) {
  var id, Id, info;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          Id = id.substr(1, id.length);
          console.log(Id);
          _context2.next = 6;
          return regeneratorRuntime.awrap(Bio.findOne({
            where: {
              entreprenuerid: Id
            }
          }));

        case 6:
          info = _context2.sent;
          res.json(info);
          console.log(info);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.log("dont panick but it seems the the id was not submitted");

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;
//# sourceMappingURL=bio.dev.js.map
