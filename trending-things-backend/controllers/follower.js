var express = require("express");
var router = express.Router();
var Follower = require("./../models/follower");
var Notification = require("./../models/notification");
var passport = require("passport");
var User = require("./../models/user");

module.exports = function(socket) {
  var router = express.Router();
  router.put(
    "/followUser",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      if (!req.body.followeeId) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      // guard against already followed user
      Follower.isFollowed(userId, req.body.followeeId, function(exists) {
        if (exists) {
          return res.status(400).send({
            error: true,
            message: "User is already followed"
          });
        } else {
          Follower.followUser(userId, req.body.followeeId, function(
            err,
            follower
          ) {
            if (err || !follower) {
              return res.status(500).send({
                error: true,
                message: err ? err.message : "Could not complete follow action"
              });
            }

            User.incrementFollowersCount(req.body.followeeId, function(
              err,
              user
            ) {
              if (err || !user) {
                return res.status(500).send({
                  error: true,
                  message: err
                    ? err.message
                    : "Could not increment followers count"
                });
              }

              Notification.addGeneralNotification(
                userId,
                req.body.followeeId,
                "follow",
                "following.you",
                socket
              );

              return res.json({
                follower,
                user
              });
            });
          });
        }
      });
    }
  );

  router.put(
    "/unFollowUser",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      if (!req.body.followeeId) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      Follower.unFollowUser(userId, req.body.followeeId)
        .then(() => {
          User.decrementFollowersCount(req.body.followeeId)
            .then(user => {
              console.log(user);
              return res.json({
                user
              });
            })
            .catch(err => {
              return res.status(500).send({
                error: true,
                message: err
                  ? err.message
                  : "Could not decrement followers count"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            error: true,
            message: err ? err.message : "Could not complete unfollow action"
          });
        });
    }
  );

  return router;
};
