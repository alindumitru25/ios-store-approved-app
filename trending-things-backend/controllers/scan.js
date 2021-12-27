var express = require("express");
var router = express.Router();
var Scan = require("./../models/scan");
var User = require("./../models/user");
var passport = require("passport");

router.get(
  "/getScans",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.query.code) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.getScans(req.query.code)
      .then(scans => {
        User.getEntitiesWithUsers(scans)
          .then(mappedScans => {
            return res.json({
              scans: mappedScans
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not get scans"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not get scans"
        });
      });
  }
);

router.put(
  "/addScan",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.body.barcode || !req.body.price || !req.body.location) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.addScan(
      req.body.barcode,
      req.body.details,
      req.body.price,
      req.body.location,
      req.user.id
    )
      .then(scan => {
        User.getEntityWithUser(scan)
          .then(mappedScan => {
            return res.json({
              scan: mappedScan
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not add scan"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not add scan"
        });
      });
  }
);

router.patch(
  "/like",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.body.scanId) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.like(req.body.scanId, req.user.id)
      .then(scan => {
        User.getEntityWithUser(scan)
          .then(mappedScan => {
            return res.json({
              scan: mappedScan
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not like scan"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not like scan"
        });
      });
  }
);

router.patch(
  "/removeLike",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.body.scanId) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.removeLike(req.body.scanId, req.user.id)
      .then(scan => {
        User.getEntityWithUser(scan)
          .then(mappedScan => {
            return res.json({
              scan: mappedScan
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not remove like scan"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not remove like scan"
        });
      });
  }
);

router.patch(
  "/dislike",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.body.scanId) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.dislike(req.body.scanId, req.user.id)
      .then(scan => {
        User.getEntityWithUser(scan)
          .then(mappedScan => {
            return res.json({
              scan: mappedScan
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not dislike scan"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not dislike scan"
        });
      });
  }
);

router.patch(
  "/removeDislike",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (!req.body.scanId) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Scan.removeDislike(req.body.scanId, req.user.id)
      .then(scan => {
        User.getEntityWithUser(scan)
          .then(mappedScan => {
            return res.json({
              scan: mappedScan
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not remove dislike scan"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not remove dislike scan"
        });
      });
  }
);

module.exports = router;
