const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const _ = require("lodash");
const MongooseMap = require("mongoose-map")(Mongoose);
const Document = require("./document");
const { filterMaps } = require("./../utils/utils");

var commentSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    documentId: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: { type: Number, required: true },
    likesUsers: MongooseMap,
    likesCount: { type: Number },
    replies: { type: [Number] }
  },
  {
    timestamps: true
  }
);

var replySchema = new Mongoose.Schema({
  id: { type: Number, required: true },
  documentId: { type: Number, required: true, index: true },
  commentId: { type: Number, required: true },
  repliedUserId: { type: Number, required: true },
  repliedUserName: { type: String, required: true },
  comment: { type: String },
  userId: { type: Number, required: true },
  likesUsers: MongooseMap,
  likesCount: { type: Number },
  replyId: { type: Number }
});

replySchema.index({ documentId: 1, type: -1 });

commentSchema.plugin(autoIncrement.plugin, {
  model: "Comment",
  field: "id",
  startAt: 1
});
replySchema.plugin(autoIncrement.plugin, {
  model: "Reply",
  field: "id",
  startAt: 1
});
var Comment = Mongoose.model("Comment", commentSchema);
var Reply = Mongoose.model("Reply", replySchema);

exports.create = function(documentId, comment, userId) {
  return new Promise(function(resolve, reject) {
    var newComment = new Comment({
      documentId,
      comment,
      userId,
      likesUsers: {},
      likesCount: 0,
      replies: []
    });

    newComment
      .save()
      .then(() => {
        resolve(newComment);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getCommentsByDocumentId = function(documentId) {
  return new Promise((resolve, reject) => {
    Comment.find({ documentId })
      .then(comments => {
        Reply.find({ documentId })
          .then(replies => {
            var commentsArr = {};
            comments.forEach(comment => {
              commentsArr[comment.id] = comment;
            });

            var repliesArr = {};
            replies.forEach(reply => {
              repliesArr[reply.id] = reply;
            });
            resolve({ commentsArr, repliesArr });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

exports.like = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Comment.findOne({ id })
      .then(function(comment) {
        var objComment = comment.toObject();
        // guard against already liked post
        if (objComment.likesUsers && objComment.likesUsers[userId]) {
          return reject("Already liked comment");
        }

        // increment like
        comment.likesCount = comment.likesCount ? comment.likesCount + 1 : 1;

        if (comment.likesUsers) {
          comment.likesUsers = Object.assign(objComment.likesUsers, {
            [userId]: true
          });
        } else {
          comment.likesUsers = { [userId]: true };
        }

        comment
          .save()
          .then(function() {
            resolve(comment);
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.dislike = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Comment.findOne({ id })
      .then(function(comment) {
        var objComment = comment.toObject();
        // if there is no likeCount or likesUsers doesn't include current users just return
        if (
          !comment.likesCount ||
          !comment.likesUsers ||
          !objComment.likesUsers[userId]
        ) {
          return reject("Comment is not liked");
        }

        // decrement like
        comment.likesCount = comment.likesCount - 1;
        comment.likesUsers = filterMaps(objComment, userId, "likesUsers");

        comment
          .save()
          .then(function() {
            resolve(comment);
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.reply = function(
  documentId,
  commentId,
  repliedUserId,
  repliedUserName,
  comment,
  userId,
  replyToReplyId
) {
  return new Promise(function(resolve, reject) {
    var newReply = new Reply({
      documentId,
      commentId,
      repliedUserId,
      repliedUserName,
      comment,
      userId,
      likesUsers: {},
      likesCount: 0,
      replyId: replyToReplyId
    });

    newReply
      .save()
      .then(() => {
        resolve(newReply);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.likeReply = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Reply.findOne({ id })
      .then(function(reply) {
        var objReply = reply.toObject();
        // guard against already liked post
        if (objReply.likesUsers && objReply.likesUsers[userId]) {
          return reject("Already liked comment");
        }

        // increment like
        reply.likesCount = reply.likesCount ? reply.likesCount + 1 : 1;

        if (reply.likesUsers) {
          reply.likesUsers = Object.assign(objReply.likesUsers, {
            [userId]: true
          });
        } else {
          reply.likesUsers = { [userId]: true };
        }

        reply
          .save()
          .then(function() {
            resolve(reply);
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.dislikeReply = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Reply.findOne({ id })
      .then(function(reply) {
        var objReply = reply.toObject();
        // if there is no likeCount or likesUsers doesn't include current users just return
        if (
          !reply.likesCount ||
          !reply.likesUsers ||
          !objReply.likesUsers[userId]
        ) {
          return reject("Comment is not liked");
        }

        // decrement like
        reply.likesCount = reply.likesCount - 1;
        reply.likesUsers = filterMaps(objReply, userId, "likesUsers");

        reply
          .save()
          .then(function() {
            resolve(reply);
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getCommentById = function(id) {
  return new Promise(function(resolve, reject) {
    Comment.findOne({ id })
      .then(function(comment) {
        resolve(comment);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
