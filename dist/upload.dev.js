"use strict";

var multer = require('multer');

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.resolve(__dirname, './images'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: "1000000"
  },
  fileFilter: function fileFilter(req, file, cb) {
    var fileTypes = /jpeg|jpg|png/;
    var mimtype = fileTypes.test(file.mimetype);
    var extname = fileTypes.test(path.extname(file.originalname));

    if (mimtype && extname) {
      return cb(null, true);
    }

    cb('give the proper file formats to upload');
  }
}).single("image");
module.exports = upload;
//# sourceMappingURL=upload.dev.js.map
