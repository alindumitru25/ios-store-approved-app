var express = require("express");
var Comment = require("./../models/comment");
var Location = require("./../models/location");
var User = require("./../models/user");
var Document = require("./../models/document");
var Promise = require("bluebird");
var passport = require("passport");
var Notification = require("./../models/notification");

var SOCKET_COMMENT_UPDATE = "SOCKET/POST_COMMENT_UPDATE";
var SOCKET_REPLY_UPDATE = "SOCKET/POST_REPLY_UPDATE";

module.exports = function(socket) {
  var router = express.Router();

  router.post(
    "/create",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var data = req.body;
      if (!data.documentId || !data.comment) {
        return res.status(400).send({
          message: "Incorrect parameters sent"
        });
      }

      Comment.create(data.documentId, data.comment, userId)
        .then(function(comment) {
          Document.getDocumentById(data.documentId)
            .then(document => {
              document.commentsCount = (document.commentsCount || 0) + 1;
              document
                .save()
                .then(() => {
                  User.getEntityWithUser(comment)
                    .then(mappedComment => {
                      // push to client the new comment for real time interaction
                      socket.emit(
                        SOCKET_COMMENT_UPDATE + "/" + data.documentId,
                        {
                          comment: mappedComment
                        }
                      );

                      Notification.addDocumentNotification(
                        data.documentId,
                        userId,
                        "comment",
                        "added.comment.to.your.product",
                        socket
                      );
                      return res.json({
                        comment: mappedComment
                      });
                    })
                    .catch(err => {
                      return res.status(500).send({
                        message: "Could not add comment to post"
                      });
                    });
                })
                .catch(err => {
                  return res.status(500).send({
                    message: "Could not add comment to post"
                  });
                });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not add comment to post"
              });
            });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not add comment to post"
          });
        });
    }
  );

  router.post(
    "/reply",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var data = req.body;
      if (!data.documentId || !data.comment || !data.commentId) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      User.getUserById(data.userId)
        .then(replyToUser => {
          Comment.getCommentById(data.commentId)
            .then(function(comment) {
              Comment.reply(
                data.documentId,
                data.commentId,
                data.userId,
                `${replyToUser.firstName} ${replyToUser.lastName}`,
                data.comment,
                userId,
                data.replyToReplyId
              )
                .then(function(reply) {
                  comment.replies.push(reply.id);
                  comment
                    .save()
                    .then(function(comment) {
                      Document.getDocumentById(data.documentId)
                        .then(document => {
                          document.commentsCount =
                            (document.commentsCount || 0) + 1;

                          document
                            .save()
                            .then(() => {
                              Promise.all([
                                User.getEntityWithUser(reply),
                                User.getEntityWithUser(comment)
                              ])
                                .spread((mappedReply, mappedComment) => {
                                  // push to client the new comment for real time interaction
                                  socket.emit(
                                    SOCKET_COMMENT_UPDATE +
                                      "/" +
                                      data.documentId,
                                    {
                                      comment: mappedComment
                                    }
                                  );

                                  socket.emit(
                                    SOCKET_REPLY_UPDATE + "/" + data.documentId,
                                    {
                                      reply: mappedReply
                                    }
                                  );

                                  Notification.addDocumentNotification(
                                    data.documentId,
                                    userId,
                                    "comment",
                                    "added.a.comment",
                                    socket,
                                    replyToUser.id
                                  );

                                  if (document.userId !== replyToUser.id) {
                                    Notification.addDocumentNotification(
                                      data.documentId,
                                      userId,
                                      "comment",
                                      "added.comment.to.your.product",
                                      socket
                                    );
                                  }

                                  // return data
                                  return res.json({
                                    comment: mappedComment,
                                    reply: mappedReply
                                  });
                                })
                                .catch(err => {
                                  console.log(err);
                                  return res.status(500).send({
                                    message: "Could not reply"
                                  });
                                });
                            })
                            .catch(err => {
                              console.log(err);
                              return res.status(500).send({
                                message: "Could not reply"
                              });
                            });
                        })
                        .catch(err => {
                          console.log(err);
                          return res.status(500).send({
                            message: "Could not reply"
                          });
                        });
                    })
                    .catch(function(err) {
                      console.log(err);
                      return res.status(500).send({
                        message: "Could not update comment with reply id"
                      });
                    });
                })
                .catch(function(err) {
                  console.log(err);
                  return res.status(500).send({
                    message: "Could not reply"
                  });
                });
            })
            .catch(function(err) {
              return res.status(500).send({
                message: "Could not find corresponding comment, wrong commentId"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not reply"
          });
        });
    }
  );

  router.get(
    "/getComments",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      Comment.getCommentsByDocumentId(req.query.documentId, req.user.id)
        .then(function({ commentsArr, repliesArr }) {
          Promise.all([
            User.getEntitiesWithUsers(commentsArr),
            User.getEntitiesWithUsers(repliesArr)
          ])
            .spread((mappedComments, mappedReplies) => {
              return res.json({
                comments: mappedComments,
                replies: mappedReplies
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).send({
                message: "Could not fetch comments"
              });
            });
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).send({
            message: "Could not fetch comments"
          });
        });
    }
  );

  router.put(
    "/like",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Comment.like(req.body.commentId, userId)
        .then(function(comment) {
          User.getEntityWithUser(comment)
            .then(mappedComment => {
              return res.json({
                comment: mappedComment
              });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not like comment"
              });
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
      Comment.dislike(req.body.commentId, userId)
        .then(function(comment) {
          User.getEntityWithUser(comment)
            .then(mappedComment => {
              return res.json({
                comment: mappedComment
              });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not dislike comment"
              });
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
      Comment.likeReply(req.body.replyId, userId)
        .then(function(reply) {
          User.getEntityWithUser(reply)
            .then(mappedReply => {
              return res.json({
                reply: mappedReply
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                message: "Could not like reply"
              });
            });
        })
        .catch(function(err) {
          console.log(err);
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
      Comment.dislikeReply(req.body.replyId, userId)
        .then(function(reply) {
          User.getEntityWithUser(reply)
            .then(mappedReply => {
              return res.json({
                reply: mappedReply
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                message: "Could not dislike reply"
              });
            });
        })
        .catch(function(err) {
          console.log(err);
          res.status(500).send({
            message: "Could not dislike reply"
          });
        });
    }
  );

  return router;
};
