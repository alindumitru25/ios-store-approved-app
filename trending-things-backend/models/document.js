const fs = require("fs");
const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const Grid = require("gridfs-stream");
const GridFs = Grid(Mongoose.connection.db, Mongoose.mongo);
const _ = require("lodash");
const Jimp = require("jimp");
const MongooseMap = require("mongoose-map")(Mongoose);
const moment = require("moment");
const { filterMaps } = require("./../utils/utils");

const documentSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    categoryId: { type: Number },
    tags: { type: [Number] },
    tagNames: { type: [String] },
    imageId: { type: String, required: true },
    userId: { type: Number, required: true },
    likeCount: { type: Number },
    likeUsers: MongooseMap,
    commentsCount: { type: Number },
    locationDescription: { type: String, required: true },
    position: {
      // keep it simple for now
      type: [Number],
      index: "2d"
    },
    formattedAddress: { type: String, required: true },
    locationId: { type: Number, required: true },
    interactionInterest: { type: Number },
    qualityFeedback: { type: Number },
    qualityFeedbackUsers: MongooseMap,
    goodPriceFeedback: { type: Number },
    goodPriceFeedbackUsers: MongooseMap,
    goodQualityPriceRatioFeedback: { type: Number },
    goodQualityPriceRatioFeedbackUsers: MongooseMap,
    worthItFeedback: { type: Number },
    worthItFeedbackUsers: MongooseMap,
    expensiveFeedback: { type: Number },
    expensiveFeedbackUsers: MongooseMap,
    badQualityFeedback: { type: Number },
    badQualityFeedbackUsers: MongooseMap,
    editorChoiceDate: { type: Date }
  },
  {
    timestamps: true
  }
);

documentSchema.plugin(autoIncrement.plugin, {
  model: "Document",
  field: "id",
  startAt: 1
});
documentSchema.index({ "$**": "text" });
var Document = Mongoose.model("Document", documentSchema);

var RAD_TO_KM = 111.12;

const getDocumentsByGeoLocation = (location, query) =>
  new Promise((resolve, reject) => {
    // PHASE 1.1 Build query to filter out based on user filter preferences
    // use $match operator for aggregate and find query for all documents
    // get documents near location
    if (location) {
      Document.aggregate([
        {
          $geoNear: {
            near: location.center,
            maxDistance: location.area / RAD_TO_KM,
            distanceField: "distance"
          }
        },
        {
          $match: query
        }
      ])
        .then(documents => {
          // PHASE 1.2 in case there are not enough documents get from all available documents
          if (_.isEmpty(documents) || documents.length < 15) {
            // get from all country but max 600
            Document.find(query)
              .then(allDocuments => {
                resolve({
                  documents: allDocuments,
                  priorityDocuments: documents
                });
              })
              .catch(err => reject(err));
          } else {
            resolve({
              documents
            });
          }
        })
        .catch(err => reject(err));
    } else {
      Document.find(query)
        .then(allDocuments => {
          resolve({
            documents: allDocuments,
            priorityDocuments: []
          });
        })
        .catch(err => reject(err));
    }
  });

const getByRecommendationScore = documents => {
  const recommendedDocuments = _
    .sortBy(
      documents,
      document =>
        document.likeCount +
        0.13 * (document.interactionInterest || 0) +
        document.qualityFeedback +
        document.goodPriceFeedback +
        document.goodQualityPriceRatioFeedback +
        document.worthItFeedback
    )
    .reverse();
  return recommendedDocuments;
};

const getNewAndTrend = documents => {
  const fourDays = moment().subtract(4, "d");
  const firstFourDays = [];

  // PHASE 2.1.1 Sort by most recent and create the four days documents array
  const sortedByDateDocuments = _
    .sortBy(documents, document => {
      const createdAt = moment(document.createdAt);
      if (createdAt >= fourDays) {
        firstFourDays.push(document);
      }
      return moment(document.createdAt);
    })
    .reverse();

  let takenDocuments;
  // PHASE 2.1.2 Take into account the first four days documents if there are more than 30 documents
  if (firstFourDays.length > 30) {
    takenDocuments = firstFourDays;
  } else {
    takenDocuments = _.take(sortedByDateDocuments, 100);
  }

  return {
    // PHASE 2.1.3 shuffle new documents
    new: _.shuffle(takenDocuments),
    // PHASE 2.1.4 sort by recommendation score
    newTrends: getByRecommendationScore(takenDocuments)
  };
};

const getPopular = documents => {
  // PHASE 2.2.1 Take maximum 900 documents sorted by popularity
  const sortedPopular = getByRecommendationScore(_.take(documents, 900));

  // PHASE 2.2.2 Take 0.15 or max of documents sorted by popularity shuffle them and take maximum 50
  return _.take(
    _.shuffle(
      _.take(
        sortedPopular,
        0.15 * sortedPopular.length > 50 ? 0.15 * sortedPopular.length : 50
      )
    ),
    50
  );
};

const getFollowersDocuments = (documents, followers) => {
  const takenDocuments = _
    .sortBy(
      _.filter(documents, document => _.includes(followers, document.userId)),
      document => moment(document.createdAt)
    )
    .reverse();

  return _.take(_.shuffle(_.take(takenDocuments, 30)), 10);
};

const getEditorChoiceDocuments = query =>
  new Promise((resolve, reject) => {
    Document.find({
      editorChoiceDate: {
        $gt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      ...query
    })
      .then(documents => resolve(documents))
      .catch(err => reject(err));
  });

exports.queryDocuments = function(location, followers, filter, pagination) {
  return new Promise(function(resolve, reject) {
    // @TODO Plan an AI recommendation model
    // Return variable number of documents that are composed from the latest documents
    // with calculated recommendation score + followed latest news (last 3 days)

    const filterObj = filter ? filter.toObject() : null;
    const filters = filterObj ? filterObj.filters : null;

    const query = {};
    if (filters && !_.isEmpty(filters)) {
      _.forEach(filters, (filter, key) => {
        if (!_.isEmpty(filter)) {
          query[key] = { $in: filter };
        }
      });
    }

    // PHASE 1 Get near documents using locations + filters
    getDocumentsByGeoLocation(location, query)
      .then(({ documents, priorityDocuments }) => {
        var documentsMap = {};
        var trendingDocumentsIds = [];

        // PHASE 2 Start documents data sorting

        // PHASE 2.1 Get new documents and new trending documents
        const newTrends = getNewAndTrend(documents);

        // PHASE 2.2 Get popular documents shuffled
        const popularDocuments = getPopular(documents);

        // PHASE 2.3 Take followers documents
        const followersDocuments = getFollowersDocuments(documents, followers);

        // PHASE 2.4 Take editor choice documents
        getEditorChoiceDocuments(query)
          .then(editorChoiceDocuments => {
            // PHASE 2.5 Shuffle documents
            const finalDocuments = _.shuffle(
              _
                .take(_.shuffle(newTrends.new), 9)
                .concat(newTrends.newTrends)
                .concat(followersDocuments)
            );

            _.forEach(finalDocuments, document => {
              documentsMap[document.id] = document;
              if (!_.includes(trendingDocumentsIds, document.id)) {
                trendingDocumentsIds.push(document.id);
              }

              if (trendingDocumentsIds.length > 25) {
                return false;
              }
            });
            _.forEach(_.take(_.shuffle(popularDocuments), 15), document => {
              documentsMap[document.id] = document;
              if (!_.includes(trendingDocumentsIds, document.id)) {
                trendingDocumentsIds.push(document.id);
              }
            });
            _.forEach(_.take(_.shuffle(editorChoiceDocuments), 8), document => {
              documentsMap[document.id] = document;
              if (!_.includes(trendingDocumentsIds, document.id)) {
                trendingDocumentsIds.push(document.id);
              }
            });

            resolve({
              documentsMap,
              trendingDocumentsIds: _.shuffle(trendingDocumentsIds)
            });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

exports.findDocumentsByText = (searchText, location, filter, pagination) =>
  new Promise((resolve, reject) => {
    pagination = parseInt(pagination);

    if (location) {
      Document.find({
        position: {
          $geoWithin: {
            $center: [location.center, location.area / RAD_TO_KM]
          }
        },
        $text: { $search: searchText }
      })
        .sort({
          likeCount: -1
        })
        .skip(pagination || 0)
        .limit(10)
        .exec()
        .then(documents => {
          let documentsMap = {};
          let searchIds = [];

          (documents || []).forEach(document => {
            documentsMap[document.id] = document;
            if (!_.includes(searchIds, document.id)) {
              searchIds.push(document.id);
            }
          });

          resolve({
            documents: documentsMap,
            searchIds
          });
        })
        .catch(err => reject(err));
    } else {
      Document.find({
        $text: { $search: searchText }
      })
        .sort({
          linkeCount: -1
        })
        .skip(pagination || 0)
        .limit(10)
        .exec()
        .then(documents => {
          let documentsMap = {};
          let searchIds = [];
          (documents || []).forEach(document => {
            documentsMap[document.id] = document;
            if (!_.includes(searchIds, document.id)) {
              searchIds.push(document.id);
            }
          });
          resolve({
            documents: documentsMap,
            searchIds
          });
        })
        .catch(documents => reject(documents));
    }
  });

exports.getDocumentsByUser = (userId, skip) =>
  new Promise((resolve, reject) => {
    Document.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(10)
      .exec()
      .then(documents => {
        if (!documents) {
          resolve({});
          return;
        }

        var documentsArr = {};

        documents.forEach(function(document, i) {
          documentsArr[document.id] = {
            ...document.toObject(),
            position: skip + i
          };
        });

        resolve(documentsArr);
      })
      .catch(err => reject(err));
  });

exports.createDocument = function(
  imageId,
  description,
  price,
  categoryId,
  tags,
  locationId,
  position,
  locationDescription,
  formattedAddress,
  userId,
  next
) {
  var newDocument = new Document({
    description: description,
    price: price,
    categoryId: categoryId,
    tags: _.map(tags, tag => tag.id),
    tagNames: _.map(tags, tag => tag.name),
    locationId: locationId,
    position: [position.longitude, position.latitude],
    locationDescription: locationDescription,
    formattedAddress: formattedAddress,
    imageId: imageId,
    userId: userId,
    likeCount: 0,
    interactionInterest: 0
  });

  newDocument.save(function(err) {
    if (err) next(err);

    next(null, newDocument);
  });
};

exports.putImage = function(file, name, next) {
  var temp_path = "image_tmp.jpg";
  Jimp.read(file)
    .then(function(img) {
      img
        .resize(720, Jimp.AUTO)
        .quality(100)
        .write(temp_path, () => {
          var writeStream = GridFs.createWriteStream({
            filename: name
          });
          writeStream.on("close", function(file) {
            next(null, file);
          });

          fs.createReadStream(temp_path).pipe(writeStream);
        });
    })
    .catch(function(err) {
      next("Could not process image through jimp");
    });
};

exports.getImage = function(id, res, next) {
  try {
    var readStream = GridFs.createReadStream({ _id: id });
    readStream.pipe(res);
  } catch (err) {}
};

exports.like = function(id, userId, next) {
  Document.findOne({ id }, function(err, document) {
    var objDocument = document.toObject();
    if (err || !document) {
      return next(err ? err : "Could not find document");
    }

    // guard against already liked post
    if (objDocument.likeUsers && objDocument.likeUsers[userId]) {
      return next("Already liked post");
    }

    // increment like
    document.likeCount = document.likeCount ? document.likeCount + 1 : 1;

    // retain userId
    if (document.likeUsers) {
      document.likeUsers = Object.assign(objDocument.likeUsers, {
        [userId]: true
      });
    } else {
      document.likeUsers = { [userId]: true };
    }

    document.save(function(err) {
      if (err) {
        return next(err);
      } else {
        return next(null, document);
      }
    });
  });
};

exports.dislike = function(id, userId, next) {
  Document.findOne({ id }, function(err, document) {
    var objDocument = document.toObject();
    if (err || !document) {
      return next(err ? err : "Could not find document");
    }

    // if there is no likeCount or likeUsers doesn't include current users just return
    if (
      !document.likeCount ||
      !document.likeUsers ||
      !objDocument.likeUsers[userId]
    ) {
      return next("Document its not liked");
    }

    // decrement like
    document.likeCount = document.likeCount - 1;
    document.likeUsers = filterMaps(objDocument, userId, "likeUsers");
    document.save(function(err) {
      if (err) return next(err);
      next(null, document);
    });
  });
};

exports.registerInteraction = function(id) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        document.interactionInterest = document.interactionInterest
          ? document.interactionInterest + 1
          : 1;

        document.save().catch(function(err) {
          reject(err);
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.findByText = function(question, location) {
  return new Promise(function(resolve, reject) {
    Document.aggregate([
      {
        $geoNear: {
          near: location.center,
          maxDistance: location.area / RAD_TO_KM,
          distanceField: "distance"
        }
      }
    ])
      .then(function(documents) {
        resolve(documents);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getDocumentById = function(id) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        resolve(document);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.feedbackQuality = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        var objDocument = document.toObject();

        if (
          objDocument.qualityFeedbackUsers &&
          objDocument.qualityFeedbackUsers[userId]
        ) {
          return reject("Already provided quality feedback!");
        }

        document.qualityFeedback = document.qualityFeedback
          ? document.qualityFeedback + 1
          : 1;

        if (document.qualityFeedbackUsers) {
          document.qualityFeedbackUsers = Object.assign(
            objDocument.qualityFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.qualityFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(function() {
            resolve(document);
          })
          .catch(function(err) {
            reject("Could not save document");
          });
      })
      .catch(function(err) {
        reject("Could not give quality feedback");
      });
  });
};

exports.unfeedbackQuality = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        var objDocument = document.toObject();

        if (
          !objDocument.qualityFeedbackUsers ||
          !objDocument.qualityFeedbackUsers[userId]
        ) {
          return reject("No feedback was provided prior to the operation!");
        }

        document.qualityFeedback = document.qualityFeedback - 1;

        if (document.qualityFeedbackUsers) {
          document.qualityFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "qualityFeedbackUsers"
          );
        }

        document
          .save()
          .then(function() {
            resolve(document);
          })
          .catch(function(err) {
            reject("Could not save document");
          });
      })
      .catch(function(err) {
        reject("Could not give quality feedback");
      });
  });
};

exports.feedbackGoodPrice = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        var objDocument = document.toObject();

        if (
          objDocument.goodPriceFeedback &&
          objDocument.goodPriceFeedbackUsers[userId]
        ) {
          return reject("Already provided price feedback!");
        }

        document.goodPriceFeedback = document.goodPriceFeedback
          ? document.goodPriceFeedback + 1
          : 1;

        if (document.goodPriceFeedbackUsers) {
          document.goodPriceFeedbackUsers = Object.assign(
            objDocument.goodPriceFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.goodPriceFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(function() {
            resolve(document);
          })
          .catch(function(err) {
            reject("Could not save document");
          });
      })
      .catch(function(err) {
        reject("Could not give price feedback");
      });
  });
};

exports.unfeedbackGoodPrice = function(id, userId) {
  return new Promise(function(resolve, reject) {
    Document.findOne({ id })
      .then(function(document) {
        var objDocument = document.toObject();

        if (
          !objDocument.goodPriceFeedback ||
          !objDocument.goodPriceFeedbackUsers[userId]
        ) {
          return reject(
            "No price feedback was provided prior to the operation!"
          );
        }

        document.goodPriceFeedback = document.goodPriceFeedback - 1;

        if (document.goodPriceFeedbackUsers) {
          document.goodPriceFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "goodPriceFeedbackUsers"
          );
        }

        document
          .save()
          .then(function() {
            resolve(document);
          })
          .catch(function(err) {
            reject("Could not save document");
          });
      })
      .catch(function(err) {
        reject("Could not give quality feedback");
      });
  });
};

exports.feedbackGoodQualityPrice = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          objDocument.goodQualityPriceRatioFeedbackUsers &&
          objDocument.goodQualityPriceRatioFeedbackUsers[userId]
        ) {
          return reject("Already provided quality ratio feedback!");
        }

        document.goodQualityPriceRatioFeedback = document.goodQualityPriceRatioFeedback
          ? document.goodQualityPriceRatioFeedback + 1
          : 1;

        if (document.goodQualityPriceRatioFeedbackUsers) {
          document.goodQualityPriceRatioFeedbackUsers = Object.assign(
            objDocument.goodQualityPriceRatioFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.goodQualityPriceRatioFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give quality price ratio feedback");
      });
  });
};

exports.unfeedbackGoodQualityPrice = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          !objDocument.goodQualityPriceRatioFeedback ||
          !objDocument.goodQualityPriceRatioFeedbackUsers[userId]
        ) {
          return reject(
            "No quality price ratio feedback was provided prior to the operation!"
          );
        }

        document.goodQualityPriceRatioFeedback =
          document.goodQualityPriceRatioFeedback - 1;

        if (document.goodQualityPriceRatioFeedbackUsers) {
          document.goodQualityPriceRatioFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "goodQualityPriceRatioFeedbackUsers"
          );
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give quality price ratio feedback");
      });
  });
};

exports.feedbackWorthIt = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          objDocument.worthItFeedbackUsers &&
          objDocument.worthItFeedbackUsers[userId]
        ) {
          return reject("Already provided worth it feedback!");
        }

        document.worthItFeedback = document.worthItFeedback
          ? document.worthItFeedback + 1
          : 1;

        if (document.worthItFeedbackUsers) {
          document.worthItFeedbackUsers = Object.assign(
            objDocument.worthItFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.worthItFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give worth it feedback");
      });
  });
};

exports.unfeedbackWorthIt = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          !objDocument.worthItFeedback ||
          !objDocument.worthItFeedbackUsers[userId]
        ) {
          return reject(
            "No worth it feedback was provided prior to the operation!"
          );
        }

        document.worthItFeedback = document.worthItFeedback - 1;

        if (document.worthItFeedbackUsers) {
          document.worthItFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "worthItFeedbackUsers"
          );
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give worth it feedback");
      });
  });
};

exports.feedbackExpensive = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          objDocument.expensiveFeedbackUsers &&
          objDocument.expensiveFeedbackUsers[userId]
        ) {
          return reject("Already provided expensive feedback!");
        }

        document.expensiveFeedback = document.expensiveFeedback
          ? document.expensiveFeedback + 1
          : 1;

        if (document.expensiveFeedbackUsers) {
          document.expensiveFeedbackUsers = Object.assign(
            objDocument.expensiveFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.expensiveFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give expensive feedback");
      });
  });
};

exports.unfeedbackExpensive = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          !objDocument.expensiveFeedback ||
          !objDocument.expensiveFeedbackUsers[userId]
        ) {
          return reject(
            "No expensive feedback was provided prior to the operation!"
          );
        }

        document.expensiveFeedback = document.expensiveFeedback - 1;

        if (document.expensiveFeedbackUsers) {
          document.expensiveFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "expensiveFeedbackUsers"
          );
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give expensive feedback");
      });
  });
};

exports.feedbackBadQuality = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          objDocument.badQualityFeedbackUsers &&
          objDocument.badQualityFeedbackUsers[userId]
        ) {
          return reject("Already provided bad quality feedback!");
        }

        document.badQualityFeedback = document.badQualityFeedback
          ? document.badQualityFeedback + 1
          : 1;

        if (document.badQualityFeedbackUsers) {
          document.badQualityFeedbackUsers = Object.assign(
            objDocument.badQualityFeedbackUsers,
            { [userId]: true }
          );
        } else {
          document.badQualityFeedbackUsers = { [userId]: true };
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give bad quality feedback");
      });
  });
};

exports.unfeedbackBadQuality = function(id, userId) {
  return new Promise((resolve, reject) => {
    Document.findOne({ id })
      .then(document => {
        var objDocument = document.toObject();

        if (
          !objDocument.badQualityFeedback ||
          !objDocument.badQualityFeedbackUsers[userId]
        ) {
          return reject(
            "No bad quality feedback was provided prior to the operation!"
          );
        }

        document.badQualityFeedback = document.badQualityFeedback - 1;

        if (document.badQualityFeedbackUsers) {
          document.badQualityFeedbackUsers = filterMaps(
            objDocument,
            userId,
            "badQualityFeedbackUsers"
          );
        }

        document
          .save()
          .then(() => {
            resolve(document);
          })
          .catch(err => {
            reject("Could not save document");
          });
      })
      .catch(err => {
        reject("Could not give bad quality feedback");
      });
  });
};

exports.markEditorChoice = documentId =>
  new Promise((resolve, reject) => {
    Document.findOneAndUpdate(
      { id: documentId },
      { $set: { editorChoiceDate: Date.now() } },
      { new: true }
    )
      .then(document => resolve(document))
      .catch(err => reject(err));
  });

// editor choice are available for SPECIFIED days then it need to be repicked, but in case we want to unmark in those SPECIFIED days
// we provide this endpoint
exports.unmarkEditorChoice = documentId =>
  new Promise((resolve, reject) => {
    Document.findOneAndUpdate(
      { id: documentId },
      { $set: { editorChoiceDate: undefined } },
      { new: true }
    )
      .then(document => resolve(document))
      .catch(err => reject(err));
  });

exports.editDocument = (documentId, newPrice) =>
  new Promise((resolve, reject) => {
    Document.findOneAndUpdate(
      { id: documentId },
      { $set: { price: newPrice } },
      { new: true }
    )
      .then(document => resolve(document))
      .catch(err => reject(err));
  });
