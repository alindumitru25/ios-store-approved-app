var express = require("express");
var router = express.Router();
var Image = require("./../models/image");

// serve documents image by imageId
router.get("/image/:imageId", function(req, res) {
  Image.getImage(req.params.imageId, res);
});

module.exports = router;
