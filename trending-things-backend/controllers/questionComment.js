var express = require("express");
var QuestionComment = require("./../models/questionComment");
var Location = require("./../models/location");
var Promise = require("bluebird");
var passport = require("passport");

var SOCKET_COMMENT_UPDATE = "SOCKET/COMMENT_UPDATE";

function createQuestionComment(res, socket, data, userId, location) {
  QuestionComment.create(
    data.questionId,
    data.comment,
    userId,
    {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      address: data.location.address,
      referenceId: data.location.referenceId,
      locationId: location.id
    },
    data.productToShare
  )
    .then(function(comment) {
      // push to client the new comment for real time interaction
      socket.emit(SOCKET_COMMENT_UPDATE + "/" + data.questionId, {
        comment: comment
      });

      // return data
      return res.json({
        comment
      });
    })
    .catch(function(err) {
      return res.status(500).send({
        message: "Could not add question and create location"
      });
    });
}

module.exports = function(socket) {
  var router = express.Router();

  router.post(
    "/create",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var data = req.body;
      if (!data.questionId || !data.comment) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      if (!data.location) {
        QuestionComment.create(
          data.questionId,
          data.comment,
          userId,
          null,
          data.productToShare
        )
          .then(function(comment) {
            // push to client the new comment for real time interaction
            socket.emit(SOCKET_COMMENT_UPDATE + "/" + data.questionId, {
              comment: comment
            });

            return res.json({
              comment
            });
          })
          .catch(function(err) {
            return res.status(500).send({
              message: "Could not add question"
            });
          });
      } else if (data.location.id) {
        // TODO
        // get saved trending location id and link to comment
      } else if (data.location.referenceId) {
        // get location if existent
        Location.getLocationByReferenceId(data.location.referenceId)
          .then(function(location) {
            if (!location) {
              // create trending location for reference id if not existent
              Location.createLocation(
                data.location.name,
                {
                  latitude: data.location.latitude,
                  longitude: data.location.longitude
                },
                data.location.address,
                data.location.referenceId
              )
                .then(function(newLocation) {
                  return createQuestionComment(
                    res,
                    socket,
                    data,
                    userId,
                    newLocation
                  );
                })
                .catch(function(err) {
                  return res.status(500).send({
                    message: "Could not add question and create location"
                  });
                });
            }

            return createQuestionComment(res, socket, data, userId, location);
          })
          .catch(function(err) {
            return res.status(500).send({
              message: "Could not get location for reference id"
            });
          });
      } else {
        Location.createLocation(
          data.location.name,
          {
            latitude: data.location.latitude,
            longitude: data.location.longitude
          },
          data.location.address
        )
          .then(function(location) {
            QuestionComment.create(
              data.questionId,
              data.comment,
              userId,
              {
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                address: data.location.address,
                locationId: location.id
              },
              data.productToShare
            )
              .then(function(comment) {
                // push to client the new comment for real time interaction
                socket.emit(SOCKET_COMMENT_UPDATE + "/" + data.questionId, {
                  comment: comment
                });

                // return data
                return res.json({
                  comment
                });
              })
              .catch(function(err) {
                return res.status(500).send({
                  message: "Could not add question and create location"
                });
              });
          })
          .catch(function(err) {
            return res.status(500).send({
              message: "Could not add question and create location"
            });
          });
      }
    }
  );

  router.post(
    "/reply",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var data = req.body;
      if (!data.questionId || !data.comment || !data.commentId || !data.reply) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      QuestionComment.getCommentById(data.commentId)
        .then(function(comment) {
          if (!data.location) {
            QuestionComment.reply(
              data.questionId,
              data.commentId,
              comment._id,
              data.reply,
              data.comment,
              userId,
              null,
              data.productToShare
            )
              .then(function(reply) {
                comment.replies.push(reply);
                comment
                  .save()
                  .then(function(comment) {
                    // push to client the new comment for real time interaction
                    socket.emit(SOCKET_COMMENT_UPDATE + "/" + data.questionId, {
                      comment: comment
                    });

                    // return data
                    return res.json({
                      comment
                    });
                  })
                  .catch(function(err) {
                    return res.status(500).send({
                      message: "Could not update comment"
                    });
                  });
              })
              .catch(function(err) {
                console.log(err);
                return res.status(500).send({
                  message: "Could not add question"
                });
              });
          } else {
            // TODO implement the other location scenarios
          }
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not find corresponding comment, wrong commentId"
          });
        });
    }
  );

  router.get(
    "/comments",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      QuestionComment.getCommentsByQuestion(req.query.questionId, req.user.id)
        .then(function(comments) {
          return res.json({
            comments: comments.composedComments
          });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not question comments"
          });
        });
    }
  );

  router.put(
    "/like",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      QuestionComment.like(req.body.commentId, userId)
        .then(function(comment) {
          return res.json({
            comment
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not like comment"
          });
        });
    }
  );

  router.put(
    "/dislike",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      QuestionComment.dislike(req.body.commentId, userId)
        .then(function(comment) {
          return res.json({
            comment
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not dislike comment"
          });
        });
    }
  );

  router.put(
    "/likeReply",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      QuestionComment.likeReply(req.body.replyId, userId)
        .then(function(reply) {
          return res.json({
            reply
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not like reply"
          });
        });
    }
  );

  router.put(
    "/dislikeReply",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      QuestionComment.dislikeReply(req.body.replyId, userId)
        .then(function(reply) {
          return res.json({
            reply
          });
        })
        .catch(function(err) {
          res.status(500).send({
            message: "Could not dislike reply"
          });
        });
    }
  );

  return router;
};
