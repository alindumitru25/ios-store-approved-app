var express = require("express");
var router = express.Router();
var Question = require("./../models/question");
var Document = require("./../models/document");
var User = require("./../models/user");
var PredefinedLocation = require("./../models/predefinedLocation");
var Promise = require("bluebird");
var passport = require("passport");
var multer = require("multer");
var upload = multer({ dest: "upload/" });

router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  upload.single("attachedPhoto"),
  function(req, res) {
    var userId = req.user.id;
    var data = req.body;

    if (!data.selectedCategory || !data.question) {
      return res.status(400).send({
        error: true,
        message: "Incorrect parameters sent"
      });
    }

    if (req.file && req.file.path) {
      // handle image upload
      Question.putImage(req.file.path, function(err, image) {
        if (err || !image) {
          return res.status(500).send({
            error: true,
            message: "Unnable to upload image"
          });
        }

        Question.create(data.question, data.selectedCategory, userId, image._id)
          .then(function(question) {
            return res.json({
              question
            });
          })
          .catch(function(err) {
            return res.status(500).send({
              message: "Could not add question"
            });
          });
      });
    } else {
      Question.create(data.question, data.selectedCategory, userId)
        .then(function(question) {
          return res.json({
            question
          });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not add question"
          });
        });
    }
  }
);

router.get(
  "/getInitialQuestions",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    Question.getRecentQuestions(req.user.id)
      .then(function(questions) {
        var questionsArr = {};

        questions.forEach(function(question) {
          questionsArr[question.id] = question;
        });

        return res.json({
          questions: questionsArr
        });
      })
      .catch(function(err) {
        return res.status(500).send({
          message: "Could not get questions"
        });
      });
  }
);

router.get(
  "/getMatchingProducts",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;
    User.findUserById(userId)
      .then(function(user) {
        PredefinedLocation.getLocationById(user.location)
          .then(function(location) {
            Document.findByText(req.params.question, location)
              .then(function(documents) {
                var documentsArr = {};

                documents.forEach(function(document) {
                  documentsArr[document.id] = document;
                });

                return res.json({
                  documents: documentsArr
                });
              })
              .catch(function(err) {
                return res.status(500).send({
                  message: "Could not get matching products"
                });
              });
          })
          .catch(function(err) {
            return res.status(500).send({
              message: "Could not get matching products"
            });
          });
      })
      .catch(function(err) {
        return res.status(500).send({
          message: "Could not get matching products"
        });
      });
  }
);

router.put(
  "/like",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;
    Question.like(req.body.questionId, userId)
      .then(function(question) {
        return res.json({
          question
        });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send({
          message: "Could not like question"
        });
      });
  }
);

router.put(
  "/dislike",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;
    Question.dislike(req.body.questionId, userId)
      .then(function(question) {
        return res.json({
          question
        });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send({
          message: "Could not dislike question"
        });
      });
  }
);

module.exports = router;
