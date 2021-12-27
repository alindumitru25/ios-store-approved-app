var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var fs = require("fs");
var Grid = require("gridfs-stream");
var GridFs = Grid(Mongoose.connection.db, Mongoose.mongo);
var path = require("path");
var Jimp = require("jimp");
var _ = require("lodash");
var MongooseMap = require("mongoose-map")(Mongoose);
const { filterMaps } = require("./../utils/utils");

var questionSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    question: { type: String, required: true },
    categoryId: { type: Number, required: true },
    userId: { type: Number, required: true },
    likesUsers: MongooseMap,
    likesCount: { type: Number },
    imageId: { type: String }
  },
  {
    timestamps: true
  }
);

questionSchema.plugin(autoIncrement.plugin, {
  model: "Question",
  field: "id",
  startAt: 1
});
var Question = Mongoose.model("Question", questionSchema);

exports.create = function(question, selectedCategory, userId, imageId) {
  return new Promise(function(resolve, reject) {
    var newQuestion = new Question({
      question,
      categoryId: selectedCategory,
      userId,
      likesUsers: {},
      likesCount: 0,
      imageId
    });

    newQuestion
      .save()
      .then(function() {
        resolve(newQuestion);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getRecentQuestions = function(userId) {
  return new Promise(function(resolve, reject) {
    Question.find(
      {},
      {},
      {
        limit: 10,
        sort: {
          createdAt: -1
        }
      }
    )
      .lean()
      .then(function(questions) {
        resolve(questions);
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
};

exports.getTrendingQuestion = function(userId) {
  return new Promise(function(resolve, reject) {
    Question.find(
      {
        createdAt: { $gt: new Date(Date.now() - 80 * 60 * 60 * 1000) }
      },
      {},
      {
        limit: 10,
        sort: {
          likesCount: -1
        }
      }
    )
      .lean()
      .then(function(questions) {
        resolve(questions);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.putImage = function(file, next) {
  var temp_path = "question_image_temp.jpg";
  Jimp.read(file)
    .then(function(img) {
      img
        .resize(720, Jimp.AUTO)
        .quality(65)
        .write(temp_path);

      var writeStream = GridFs.createWriteStream({
        filename: "question_image"
      });
      writeStream.on("close", function(file) {
        next(null, file);
      });

      fs.createReadStream(temp_path).pipe(writeStream);
    })
    .catch(function(err) {
      next("Could not process image through jimp");
    });
};

exports.like = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Question.findOne({ id })
      .then(function(question) {
        var objQuestion = question.toObject();
        // guard against already liked post
        if (objQuestion.likesUsers && objQuestion.likesUsers[userId]) {
          return reject("Already liked question");
        }

        // increment like
        question.likesCount = question.likesCount ? question.likesCount + 1 : 1;

        if (question.likesUsers) {
          question.likesUsers = Object.assign(objQuestion.likesUsers, {
            [userId]: true
          });
        } else {
          question.likesUsers = { [userId]: true };
        }

        question
          .save()
          .then(function() {
            resolve(question);
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
    Question.findOne({ id })
      .then(function(question) {
        var objQuestion = question.toObject();
        // if there is no likeCount or likesUsers doesn't include current users just return
        if (
          !question.likesCount ||
          !question.likesUsers ||
          !objQuestion.likesUsers[userId]
        ) {
          return reject("Question is not liked");
        }

        // decrement like
        question.likesCount = question.likesCount - 1;
        question.likesUsers = filterMaps(objQuestion, userId, "likesUsers");

        question
          .save()
          .then(function() {
            resolve(question);
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
