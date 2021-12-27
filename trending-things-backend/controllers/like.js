var express = require("express");
var router = express.Router();
var Document = require("./../models/document");
var Notification = require("./../models/notification");
var User = require("./../models/user");
var passport = require("passport");
var multer = require("multer");

module.exports = function(socket) {
  const router = express.Router();
  router.put(
    "/document",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      if (!req.body.documentId) {
        return res.status(400).send({
          error: true,
          message: "Incorrect request parameters sent"
        });
      }

      Document.like(req.body.documentId, userId, function(err, document) {
        if (err || !document) {
          return res.status(500).send({
            error: true,
            message: err ? err : "Could not complete like action"
          });
        }

        User.getEntityWithUser(document)
          .then(mappedDocument => {
            Notification.addDocumentNotification(
              req.body.documentId,
              req.user.id,
              "userLike",
              "liked.your.product",
              socket
            );

            return res.json({
              document: mappedDocument
            });
          })
          .catch(err => {
            return res.status(500).send({
              error: true,
              message: err ? err : "Could not complete like action"
            });
          });
      });
    }
  );

  return router;
};
