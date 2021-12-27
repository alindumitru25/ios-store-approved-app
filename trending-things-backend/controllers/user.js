var express = require("express");
var auth = require("./../auth.js")();
var router = express.Router();
var _ = require("lodash");
var jwt = require("jwt-simple");
var cfg = require("./../configs/authConfig.js");
var passport = require("passport");
var bcrypt = require("bcrypt");
var multer = require("multer");
var upload = multer({ dest: "upload/avatars" });

var User = require("./../models/user");
var UserPreferences = require("./../models/userPreferences");

function comparePassword(receivedPassword, password, next) {
  bcrypt.compare(receivedPassword, password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
}

router.post(
  "/tryLogin",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    res.json({
      userId: req.user.id
    });
  }
);

router.post("/facebook/login", (req, res) => {
  passport.authenticate("facebook-token", (err, { user, token }, info) => {
    if (err || !user || !token) {
      res.status(401).json({
        error: err
      });
    } else {
      res.json({
        userId: user.id,
        token
      });
    }
  })(req, res);
});

router.post("/login", function(req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;

    User.findUser(email, function(err, user) {
      if (err || !user) return res.sendStatus(403);

      // check password
      comparePassword(password, user.password, function(err, isMatch) {
        if (err || !isMatch) return res.sendStatus(403);
        var payload = {
          id: user.id
        };
        var token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
          token: token,
          userId: user.id
        });
      });
    });
  } else {
    res.sendStatus(403);
  }
});

router.put("/create", function(req, res) {
  if (req.body.email && req.body.password) {
    User.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.location,
      function(err, user) {
        if (err || !user) {
          // handle already existing
          console.log(err);
          if (err.message === "Duplicate user") {
            return res.status(409).send(err);
          }

          return err
            ? res.status(500).send(err)
            : res.status(500).send("Error creating user");
        } else {
          return res.json({
            user
          });
        }
      }
    );
  } else {
    return res.send("Error - bad request");
  }
});

router.post(
  "/saveAvatar",
  passport.authenticate(["jwt"], { session: false }),
  upload.single("image"),
  function(req, res) {
    var userId = req.user.id;
    if (!req.file || !userId) {
      return res.status(400).send({
        error: true,
        message: "Incorrect parameters sent"
      });
    }

    User.saveAvatar(req.file.path, req.file.name, userId, function(err, image) {
      if (err || !image) {
        return res.status(500).send({
          error: true,
          message: err ? err.message : "Unnable to save avatar"
        });
      }

      return res.json({
        success: true
      });
    });
  }
);

router.patch(
  "/setLocation",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;
    if (!req.body.locationId) {
      return res.status(400).send({
        error: true,
        message: "Incorrect parameters sent"
      });
    }

    User.setLocation(userId, req.body.locationId)
      .then(user => {
        return res.json({
          user
        });
      })
      .catch(err => {
        return res.status(500).send({
          error: true,
          message: err ? err.message : "Unnable to save location"
        });
      });
  }
);

router.post(
  "/userPreferences/updateLocationTooltip",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    if (req.body.hideLocationTooltip === undefined) {
      return res.status(400).send({
        error: true,
        message: "Incorrect parameters sent"
      });
    }

    UserPreferences.updateOrCreateUserPreferences(
      req.user.id,
      req.body.hideLocationTooltip
    )
      .then(userPreferences => {
        return res.json({
          userPreferences
        });
      })
      .catch(err => {
        return res.status(500).send({
          error: true,
          message: err ? err.message : "Unable to save user preferences"
        });
      });
  }
);

router.post("/resetPassword", (req, res) => {
  if (req.body.token === undefined || req.body.newPassword === undefined) {
    return res.status(400).send({
      error: true,
      message: "Incorrect parameters sent"
    });
  }

  User.resetPassword(req.body.token, req.body.newPassword)
    .then(() => {
      return res.status(200).send({});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({
        error: true,
        message: err ? err.message : "Unable to send reset password"
      });
    });
});

router.post("/sendResetEmail", (req, res) => {
  if (req.body.email === undefined) {
    return res.status(400).send({
      error: true,
      message: "Incorrect parameters sent"
    });
  }

  User.sendResetEmail(req.body.email)
    .then(() => {
      return res.status(200).send({});
    })
    .catch(err => {
      return res.status(500).send({
        error: true,
        message: err ? err.message : "Unable to send reset email"
      });
    });
});

router.post("/activateUser", (req, res) => {
  if (req.body.token === undefined) {
    return res.status(400).send({
      error: true,
      message: "Incorrect parameters sent"
    });
  }

  User.activateUser(req.body.token)
    .then(() => {
      return res.status(200).send({});
    })
    .catch(err => {
      return res.status(500).send({
        error: true,
        message: err ? err.message : "Unable to activate user"
      });
    });
});

router.get("/activate/:token", (req, res) => {
  if (req.params.token === undefined) {
    return res.redirect("https://trendingthings.ro/activate-deny.html");
  }

  User.activateUser(req.params.token)
    .then(() => {
      return res.redirect("https://trendingthings.ro/activate-confirm.html");
    })
    .catch(err => {
      return res.redirect("https://trendingthings.ro/activate-deny.html");
    });
});

// serve avatars image by userId
router.get("/avatar/:userId", function(req, res) {
  User.findUserById(req.params.userId)
    .then(function(user) {
      User.getAvatar(user.avatarId, res);
    })
    .catch(function(err) {
      res.status(404);
    });
});

router.patch(
  "/changePassword",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;
    if (!req.body.oldPassword || !req.body.newPassword) {
      return res.status(400).send({
        error: true,
        message: "Incorrect parameters sent"
      });
    }

    User.changePassword(userId, req.body.oldPassword, req.body.newPassword)
      .then(user => {
        return res.json({});
      })
      .catch(err => {
        return res.status(500).send({
          error: true,
          message: err ? err.message : "Unnable to change password"
        });
      });
  }
);

module.exports = router;
