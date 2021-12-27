var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var path = require("path");
var MongooseMap = require("mongoose-map")(Mongoose);
var Location = require("./location");
var _ = require("lodash");
const { filterMaps } = require("./../utils/utils");

var scanSchema = new Mongoose.Schema(
  {
    code: { type: Number, required: true },
    type: { type: String },
    details: { type: String },
    locationId: { type: Number, required: true },
    locationDescription: { type: String },
    price: { type: Number, required: true },
    userId: { type: Number, required: true },
    position: { type: [Number], required: true },
    likeUsers: MongooseMap,
    likeCount: { type: Number },
    dislikeUsers: MongooseMap,
    dislikeCount: { type: Number }
  },
  {
    timestamps: true
  }
);

scanSchema.plugin(autoIncrement.plugin, {
  model: "Scan",
  field: "id",
  startAt: 1
});
var Scan = Mongoose.model("Scan", scanSchema);

exports.getScans = code =>
  new Promise((resolve, reject) => {
    Scan.find({ code })
      .then(scans => {
        var scansArr = {};

        scans.forEach(scan => {
          scansArr[scan.id] = scan;
        });
        resolve(scansArr);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.addScan = (barcode, details, price, location, userId) =>
  new Promise((resolve, reject) => {
    Location.getCreateLocation(location)
      .then(currentLocation => {
        const scan = new Scan({
          code: barcode.code,
          type: barcode.type,
          details,
          locationId: currentLocation.id,
          locationDescription: currentLocation.description
            ? currentLocation.description +
              ", " +
              currentLocation.formattedAddress
            : currentLocation.formattedAddress,
          price,
          userId,
          position: currentLocation.position,
          likeUsers: 0,
          dislikeUsers: 0
        });

        scan
          .save()
          .then(() => resolve(scan))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

exports.like = (id, userId) => {
  return new Promise((resolve, reject) => {
    Scan.findOne({ id })
      .then(scan => {
        var objScan = scan.toObject();
        // guard against already like
        if (objScan.likeUsers && objScan.likeUsers[userId]) {
          return reject("Already liked");
        }

        // increment likes
        scan.likeCount = scan.likeCount ? scan.likeCount + 1 : 1;

        if (scan.likeUsers) {
          scan.likeUsers = Object.assign(objScan.likeUsers, {
            [userId]: true
          });
        } else {
          scan.likeUsers = { [userId]: true };
        }

        if (objScan.dislikeUsers && objScan.dislikeUsers[userId]) {
          scan.dislikeCount = scan.dislikeCount - 1;
          scan.dislikeUsers = filterMaps(objScan, userId, "dislikeUsers");
        }

        scan
          .save()
          .then(() => {
            resolve(scan);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.removeLike = (id, userId) => {
  return new Promise((resolve, reject) => {
    Scan.findOne({ id })
      .then(scan => {
        var objScan = scan.toObject();
        // if there is no likeCount or likeUsers doesn't include current users just return
        if (!scan.likeCount || !scan.likeUsers || !objScan.likeUsers[userId]) {
          return reject("Scan is not liked");
        }

        // decrement like count
        scan.likeCount = scan.likeCount - 1;
        scan.likeUsers = filterMaps(objScan, userId, "likeUsers");

        scan
          .save()
          .then(() => {
            resolve(scan);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.dislike = (id, userId) => {
  return new Promise((resolve, reject) => {
    Scan.findOne({ id })
      .then(scan => {
        var objScan = scan.toObject();
        // guard against already like
        if (objScan.dislikeUsers && objScan.dislikeUsers[userId]) {
          return reject("Already disliked");
        }

        // increment dislikes
        scan.dislikeCount = scan.dislikeCount ? scan.dislikeCount + 1 : 1;

        if (scan.dislikeUsers) {
          scan.dislikeUsers = Object.assign(objScan.dislikeUsers, {
            [userId]: true
          });
        } else {
          scan.dislikeUsers = { [userId]: true };
        }

        if (objScan.likeUsers && objScan.likeUsers[userId]) {
          scan.likeCount = scan.likeCount - 1;
          scan.likeUsers = filterMaps(objScan, userId, "likeUsers");
        }

        scan
          .save()
          .then(() => {
            resolve(scan);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.removeDislike = (id, userId) => {
  return new Promise((resolve, reject) => {
    Scan.findOne({ id })
      .then(scan => {
        var objScan = scan.toObject();
        // if there is no likeCount or dislikeUsers doesn't include current users just return
        if (
          !scan.dislikeCount ||
          !scan.dislikeUsers ||
          !objScan.dislikeUsers[userId]
        ) {
          return reject("Scan is not disliked");
        }

        // decrement dislike count
        scan.dislikeCount = scan.dislikeCount - 1;
        scan.dislikeUsers = filterMaps(objScan, userId, "dislikeUsers");

        scan
          .save()
          .then(() => {
            resolve(scan);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
