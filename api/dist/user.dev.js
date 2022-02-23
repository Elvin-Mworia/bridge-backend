"use strict";

var router = require('express').Router();

var _require = require("../models"),
    Users = _require.Users;

router.get("/:id", function _callee(req, res) {
  var id, Id, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.prev = 1;
          Id = id.substr(1, id.length);
          _context.next = 5;
          return regeneratorRuntime.awrap(Users.findByPk(Id));

        case 5:
          user = _context.sent;
          res.json(user);
          console.log(user);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log("no user with the following id:".concat(id, " was found"));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = router;
//# sourceMappingURL=user.dev.js.map
