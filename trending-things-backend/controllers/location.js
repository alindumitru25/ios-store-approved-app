var express = require("express");
var router = express.Router();
var Location = require("./../models/location");
var passport = require("passport");
var multer = require("multer");
var PredefinedLocation = require("./../models/predefinedLocation");

/**
 * @Returns location based on position for maps
 */
router.get(
  "/mapLocations",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    // just return all locations for now
    Location.getLocations(function(err, locations) {
      if (err || !locations) {
        return res.status(500).send({
          error: true,
          message: err ? err.message : "Could not get locations"
        });
      }

      return res.json(locations);
    });
  }
);

router.get(
  "/aroundLocations",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    if (!req.query.latitude || !req.query.longitude) {
      return res.status(500).send({
        message: "Incorrect parameters sent"
      });
    }

    Location.getAroundLocations(req.query.latitude, req.query.longitude)
      .then(function(locations) {
        return res.json(locations);
      })
      .catch(function(err) {
        return res.status(500).send({
          message: "Could not get locations"
        });
      });
  }
);

router.get("/predefinedLocations", function(req, res) {
  PredefinedLocation.getLocations()
    .then(function(predefinedLocations) {
      return res.json({ predefinedLocations });
    })
    .catch(function(err) {
      return res.status(500).send({
        message: "Could not get predefined locations"
      });
    });
});

module.exports = router;
