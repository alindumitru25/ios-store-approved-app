var express = require("express");
var Review = require("./../models/review");
var Location = require("./../models/location");
var Promise = require("bluebird");
var passport = require("passport");

var SOCKET_REVIEW_UPDATE = "SOCKET/POST_REVIEW_UPDATE";

module.exports = function(socket) {
  var router = express.Router();

  router.post(
    "/create",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var data = req.body;
      if (!data.documentId || (!data.review && !data.rating)) {
        return res.status(400).send({
          message: "Incorrect parameters sent"
        });
      }

      Review.create(data.documentId, data.review, data.rating, userId)
        .then(function(review) {
          // push to client the new review for real time interaction
          socket.emit(SOCKET_REVIEW_UPDATE + "/" + data.documentId, {
            review: review
          });

          return res.json({
            review
          });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not add review to post"
          });
        });
    }
  );

  router.get(
    "/getReviews",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      Review.getReviewsByDocumentId(req.query.documentId, req.user.id)
        .then(function(reviewsArr) {
          return res.json({
            reviews: reviewsArr
          });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not fetch reviews"
          });
        });
    }
  );

  router.put(
    "/useful",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Review.useful(req.body.reviewId, userId)
        .then(function(review) {
          return res.json({
            review
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not mark review as useful"
          });
        });
    }
  );

  router.put(
    "/removeUseful",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Review.removeUseful(req.body.reviewId, userId)
        .then(function(review) {
          return res.json({
            review
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not remove useful marked review"
          });
        });
    }
  );

  router.put(
    "/notUseful",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Review.notUseful(req.body.reviewId, userId)
        .then(function(review) {
          return res.json({
            review
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not mark review as not useful"
          });
        });
    }
  );

  router.put(
    "/removeNotUseful",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Review.removeNotUseful(req.body.reviewId, userId)
        .then(function(review) {
          return res.json({
            review
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not remove not useful marked review"
          });
        });
    }
  );

  return router;
};
