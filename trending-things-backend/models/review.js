var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var _ = require("lodash");
var MongooseMap = require("mongoose-map")(Mongoose);
const { filterMaps } = require("./../utils/utils");

var reviewSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    documentId: { type: Number, required: true },
    review: { type: String },
    rating: { type: Number },
    userId: { type: Number, required: true },
    usefulUsers: MongooseMap,
    usefulCount: { type: Number },
    notUsefulUsers: MongooseMap,
    notUsefulCount: { type: Number }
  },
  {
    timestamps: true
  }
);

reviewSchema.plugin(autoIncrement.plugin, {
  model: "Review",
  field: "id",
  startAt: 1
});

var Review = Mongoose.model("Review", reviewSchema);

exports.create = function(documentId, review, rating, userId) {
  return new Promise(function(resolve, reject) {
    var newReview = new Review({
      documentId,
      review,
      userId,
      usefulUsers: {},
      usefulCount: 0,
      rating
    });

    newReview
      .save()
      .then(function() {
        resolve(newReview);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getReviewsByDocumentId = function(documentId) {
  return new Promise((resolve, reject) => {
    Review.find({ documentId })
      .then(reviews => {
        var reviewsArr = {};
        reviews.forEach(review => {
          reviewsArr[review.id] = review;
        });

        resolve(reviewsArr);
      })
      .catch(err => reject(err));
  });
};

exports.useful = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Review.findOne({ id })
      .then(function(review) {
        var objReview = review.toObject();
        // guard against already useful action post
        if (objReview.usefulUsers && objReview.usefulUsers[userId]) {
          return reject("Already marked review as useful");
        }

        // increment useful count
        review.usefulCount = review.usefulCount ? review.usefulCount + 1 : 1;

        if (review.usefulUsers) {
          review.usefulUsers = Object.assign(objReview.usefulUsers, {
            [userId]: true
          });
        } else {
          review.usefulUsers = { [userId]: true };
        }

        if (objReview.notUsefulUsers && objReview.notUsefulUsers[userId]) {
          review.notUsefulCount = review.notUsefulCount - 1;
          review.notUsefulUsers = filterMaps(
            objReview,
            userId,
            "notUsefulUsers"
          );
        }

        review
          .save()
          .then(function() {
            resolve(review);
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

exports.removeUseful = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Review.findOne({ id })
      .then(function(review) {
        var objReview = review.toObject();
        // if there is no not usefulCount or not usefulUsers doesn't include current users just return
        if (
          !review.usefulCount ||
          !review.usefulUsers ||
          !objReview.usefulUsers[userId]
        ) {
          return reject("Review is not marked as useful");
        }

        // decrement not useful count
        review.usefulCount = review.usefulCount - 1;
        review.usefulUsers = filterMaps(objReview, userId, "usefulUsers");

        review
          .save()
          .then(function() {
            resolve(review);
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

exports.notUseful = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Review.findOne({ id })
      .then(function(review) {
        var objReview = review.toObject();
        // guard against already not useful action post
        if (objReview.notUsefulUsers && objReview.notUsefulUsers[userId]) {
          return reject("Already marked review as not useful");
        }

        // increment not useful count
        review.notUsefulCount = review.notUsefulCount
          ? review.notUsefulCount + 1
          : 1;

        if (review.notUsefulUsers) {
          review.notUsefulUsers = Object.assign(objReview.notUsefulUsers, {
            [userId]: true
          });
        } else {
          review.notUsefulUsers = { [userId]: true };
        }

        if (objReview.usefulUsers && objReview.usefulUsers[userId]) {
          review.usefulCount = review.usefulCount - 1;
          review.usefulUsers = filterMaps(objReview, userId, "usefulUsers");
        }

        review
          .save()
          .then(function() {
            resolve(review);
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

exports.removeNotUseful = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Review.findOne({ id })
      .then(function(review) {
        var objReview = review.toObject();
        // if there is no usefulCount or usefulUsers doesn't include current users just return
        if (
          !review.notUsefulCount ||
          !review.notUsefulUsers ||
          !objReview.notUsefulUsers[userId]
        ) {
          return reject("Review is not marked as not useful");
        }

        // decrement useful count
        review.notUsefulCount = review.notUsefulCount - 1;
        review.notUsefulUsers = filterMaps(objReview, userId, "notUsefulUsers");

        review
          .save()
          .then(function() {
            resolve(review);
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
