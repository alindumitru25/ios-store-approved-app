var fs = require("fs");
var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;

var predefinedLocationSchema = new Mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  center: {
    type: [Number],
    required: true
  },
  area: { type: Number, required: true }
});

var Location = Mongoose.model("PredefinedLocation", predefinedLocationSchema);

exports.getLocationById = function(id, next) {
  return new Promise(function(resolve, reject) {
    Location.findOne({ id })
      .then(function(location) {
        resolve(location);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getLocations = () =>
  new Promise((resolve, reject) => {
    Location.find({})
      .then(locations => {
        resolve(locations);
      })
      .catch(err => reject(err));
  });
