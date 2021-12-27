var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var path = require("path");
var MongooseMap = require("mongoose-map")(Mongoose);
var _ = require("lodash");

var filterSchema = new Mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  filters: MongooseMap // type -> filterId // eg. category -> categortId
});

var Filter = Mongoose.model("Filter", filterSchema);

exports.getFilters = userId =>
  new Promise((resolve, reject) => {
    Filter.findOne({ userId })
      .then(filter => {
        resolve(filter);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.setFilter = (userId, filters) =>
  new Promise((resolve, reject) => {
    Filter.findOne({ userId })
      .then(filter => {
        if (!filter) {
          var newFilter = new Filter({
            userId,
            filters
          });

          newFilter
            .save()
            .then(() => {
              resolve(newFilter);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          filter.filters = filters;

          filter
            .save()
            .then(() => {
              resolve(filter);
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => reject(err));
  });

exports.clearFilter = (userId, type, typeId) =>
  new Promise((resolve, reject) => {
    Filter.findOne({ userId }).then(filter => {
      var objFilter = filter.toObject();
      delete objFilter.filters[type];
      filter.filters = objFilter.filters;

      filter
        .save()
        .then(() => {
          resolve(filter);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
