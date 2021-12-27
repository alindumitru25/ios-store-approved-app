var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var _ = require("lodash");
var MongooseMap = require("mongoose-map")(Mongoose);
const { filterMaps } = require("./../utils/utils");

var questionCommentSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    questionId: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: { type: Number, required: true },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String },
      referenceId: { type: String },
      locationId: { type: Number }
    },
    likesUsers: MongooseMap,
    likesCount: { type: Number },
    replies: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "QuestionReply"
      }
    ],
    productId: { type: Number },
    productDescription: { type: String }
  },
  {
    timestamps: true
  }
);

var questionReplySchema = new Mongoose.Schema({
  id: { type: Number, required: true },
  questionId: { type: Number, required: true, index: true },
  commentId: { type: Number, required: true },
  refCommentId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "QuestionComment",
    required: true
  },
  repliedUserId: { type: Number, required: true },
  repliedUserName: { type: String, required: true },
  comment: { type: String },
  userId: { type: Number, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String },
    referenceId: { type: String },
    locationId: { type: Number }
  },
  likesUsers: MongooseMap,
  likesCount: { type: Number },
  productId: { type: Number },
  productDescription: { type: String }
});

questionReplySchema.index({ questionId: 1, type: -1 });

questionCommentSchema.plugin(autoIncrement.plugin, {
  model: "QuestionComment",
  field: "id",
  startAt: 1
});
questionReplySchema.plugin(autoIncrement.plugin, {
  model: "QuestionReply",
  field: "id",
  startAt: 1
});
var Comment = Mongoose.model("QuestionComment", questionCommentSchema);
var Reply = Mongoose.model("QuestionReply", questionReplySchema);

exports.create = function(
  questionId,
  comment,
  userId,
  location,
  productToShare
) {
  return new Promise(function(resolve, reject) {
    var newComment = new Comment({
      questionId,
      comment,
      userId,
      location,
      likesUsers: {},
      likesCount: 0,
      replies: [],
      productId: productToShare ? productToShare.id : undefined,
      productDescription: productToShare
        ? productToShare.description
        : undefined
    });

    newComment
      .save()
      .then(function() {
        resolve(newComment);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.reply = function(
  questionId,
  commentId,
  refCommentId,
  reply,
  comment,
  userId,
  location,
  productToShare
) {
  return new Promise(function(resolve, reject) {
    var newReply = new Reply({
      questionId,
      commentId,
      refCommentId,
      repliedUserId: reply.repliedUserId,
      repliedUserName: reply.repliedUserName,
      comment,
      userId,
      location,
      likesUsers: {},
      likesCount: 0,
      productId: productToShare ? productToShare.id : undefined,
      productDescription: productToShare ? productToShare.description : null
    });

    newReply
      .save()
      .then(function() {
        resolve(newReply);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getCommentById = function(id) {
  return new Promise(function(resolve, reject) {
    Comment.findOne({ id })
      .populate("replies")
      .then(function(comment) {
        resolve(comment);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getCommentsByQuestion = function(questionId, userId) {
  return new Promise(function(resolve, reject) {
    Comment.find({ questionId })
      .populate("replies")
      .lean()
      .then(function(comments) {
        // TODO Composable logic / Performance?
        var composedComments = {};
        comments.forEach(function(comment) {
          composedComments[comment.id] = comment;
        });
        resolve({
          composedComments
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.like = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Comment.findOne({ id })
      .populate("replies")
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
      .populate("replies")
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

exports.likeReply = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Reply.findOne({ id })
      .then(function(reply) {
        var objReply = reply.toObject();
        // guard against already liked post
        if (reply.likesUsers && objReply.likesUsers[userId]) {
          return reject("Already liked reply");
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
          return reject("Reply is not liked");
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
