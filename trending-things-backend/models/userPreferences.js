var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;

const userPreferencesSchema = new Mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  hideLocationTooltip: { type: Boolean }
});

userPreferencesSchema.plugin(autoIncrement.plugin, {
  model: "UserPreferences",
  field: "id",
  startAt: 1
});
const UserPreferences = Mongoose.model(
  "UserPreferences",
  userPreferencesSchema
);

exports.updateOrCreateUserPreferences = (userId, hideLocationTooltip) =>
  new Promise((resolve, reject) => {
    UserPreferences.findOne({ userId })
      .then(userPreferences => {
        if (!userPreferences) {
          const newUserPreferences = new UserPreferences({
            userId,
            hideLocationTooltip
          });

          newUserPreferences
            .save()
            .then(() => resolve(newUserPreferences))
            .catch(err => reject(err));
        } else {
          userPreferences.hideLocationTooltip = hideLocationTooltip;

          userPreferences
            .save()
            .then(() => resolve(userPreferences))
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });

exports.getUserPreferences = userId =>
  new Promise((resolve, reject) => {
    UserPreferences.findOne({ userId })
      .then(userPreferences => resolve(userPreferences))
      .catch(err => reject(err));
  });
