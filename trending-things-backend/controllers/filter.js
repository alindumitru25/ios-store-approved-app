var express = require("express");
var router = express.Router();
var Filter = require("./../models/filter");
var passport = require("passport");

router.get(
  "/getFilters",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    var userId = req.user.id;
    Filter.getFilters(userId)
      .then(filters => {
        return res.json({
          filters
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not get filters"
        });
      });
  }
);

router.put(
  "/setFilter",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    var userId = req.user.id;

    if (!req.body.filters) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Filter.setFilter(userId, req.body.filters)
      .then(filter => {
        return res.json({
          filter
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not get filters"
        });
      });
  }
);

router.put(
  "/clearFilter",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    var userId = req.user.id;

    if (!req.body.type) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Filter.clearFilter(userId, req.body.type)
      .then(filter => {
        return res.json({
          filter
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not clear filter"
        });
      });
  }
);

module.exports = router;
