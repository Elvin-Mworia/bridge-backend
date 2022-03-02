"use strict";

var router = require('express').Router();

var _require = require("../models"),
    Bio = _require.Bio;

var path = require("path");

router.post("/update/:id", function _callee2(req, res) {
  var id, Id, image, uploadPath, picpath, data, user, updated, _updated;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          console.log(Object.assign({}, req.files));
          id = req.params.id;
          Id = id.substr(1, id.length);

          if (req.files == undefined || req.files == null) {
            uploadPath = __dirname + "/images/" + "profilepic.jpg";
          } else {
            // uploadPath=path.resolve(__dirname+"../images/")+image.name;
            image = Object.assign({}, req.files.images); // uploadPath="/images/"+image.name;

            uploadPath = __dirname + "/images/" + image.name;
            image.mv(uploadPath, function _callee(err) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!err) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return", res.json({
                        message: "could not upload the image"
                      }));

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }

          picpath = uploadPath.substr(40, uploadPath.length);
          console.log(picpath); //console.log(image);
          //console.log(uploadPath);

          data = {
            profilepicture: picpath,
            UserId: Id,
            contact: req.body.contact,
            city: req.body.city,
            county: req.body.county,
            country: req.body.country,
            socialmedia: req.body.socialmedia
          };
          _context2.prev = 8;
          _context2.next = 11;
          return regeneratorRuntime.awrap(Bio.findOne({
            where: {
              UserId: Id
            }
          }));

        case 11:
          user = _context2.sent;
          console.log(user);

          if (!(user != null)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 16;
          return regeneratorRuntime.awrap(Bio.update(data, {
            where: {
              UserId: Id
            }
          }));

        case 16:
          updated = _context2.sent;
          res.json({
            updated: updated
          });
          _context2.next = 24;
          break;

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap(Bio.create(data));

        case 22:
          _updated = _context2.sent;
          res.json({
            updated: _updated
          });

        case 24:
          _context2.next = 29;
          break;

        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](8);
          console.log(_context2.t0);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 26]]);
}); //getting data of a specific entreprenuer

router.get("/data/:id", function _callee3(req, res) {
  var id, Id, info;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          Id = id.substr(1, id.length);
          console.log(Id);
          _context3.next = 6;
          return regeneratorRuntime.awrap(Bio.findOne({
            where: {
              UserId: Id
            }
          }));

        case 6:
          info = _context3.sent;
          res.json(info);
          console.log(info);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.log("seems the id was not submitted");

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;
//# sourceMappingURL=bio.dev.js.map
