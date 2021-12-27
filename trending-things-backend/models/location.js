var Mongoose = require("mongoose");
var Promise = require("bluebird");
Mongoose.Promise = Promise;
var NearBySearch = require("googleplaces/lib/NearBySearch");

// define google places config
var apiKey = "";
var outputFormat = "json";

var nearbySearch = new NearBySearch(apiKey, outputFormat);

var locationSchema = new Mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  description: { type: String, required: true },
  position: {
    // keep it simple for now
    type: [Number],
    index: "2d",
    required: true
  },
  formattedAddress: { type: String, required: true },
  googleRefId: { type: String }
});

locationSchema.plugin(autoIncrement.plugin, {
  model: "Location",
  field: "id",
  startAt: 1
});
var Location = Mongoose.model("Location", locationSchema);

createLocation = function(
  description,
  position,
  formattedAddress,
  googleRefId
) {
  return new Promise(function(resolve, reject) {
    var newLocation = new Location({
      description: description,
      position: [position.longitude, position.latitude],
      formattedAddress: formattedAddress,
      googleRefId
    });

    newLocation
      .save()
      .then(function(newLocation) {
        resolve(newLocation);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getLocations = function(next) {
  Location.find({}, function(err, locations) {
    if (err) return next(err);

    var locationsArr = {};
    locations.forEach(function(location) {
      locationsArr[location.id] = location;
    });

    return next(null, locationsArr);
  });
};

exports.getLocationById = function(id, next) {
  Location.findOne({ id }, function(err, location) {
    if (err) return next(err);

    return next(null, location);
  });
};

exports.getAroundLocations = function(latitude, longitude) {
  return new Promise(function(resolve, reject) {
    var parameters = {
      location: [latitude, longitude],
      rankby: "distance"
    };

    nearbySearch(parameters, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

exports.getLocationByReferenceId = function(referenceId) {
  return new Promise(function(resolve, reject) {
    Location.findOne({ googleRefId: referenceId })
      .then(function(location) {
        resolve(location);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getCreateLocation = location => {
  return new Promise((resolve, reject) => {
    // check if location exists
    Location.findOne({
      $or: [
        {
          formattedAddress: location.address,
          description: location.name // if location description is different, most likely there's a different store on the same address
        },
        {
          position: [location.longitude, location.latitude],
          description: location.name // if location description is different, most likely there's a different store on the same address
        }
      ]
    })
      .then(currentLocation => {
        if (!currentLocation) {
          createLocation(
            location.name,
            {
              longitude: location.longitude,
              latitude: location.latitude
            },
            location.address,
            location.referenceId
          )
            .then(createdLocation => {
              resolve(createdLocation);
            })
            .catch(err => reject(err));
        } else {
          resolve(currentLocation);
        }
      })
      .catch(err => reject(err));
  });
};

exports.createLocation = createLocation;
