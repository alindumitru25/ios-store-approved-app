const express = require("express");
const router = express.Router();
const Category = require("./../models/category");
const Tag = require("./../models/tag");
const User = require("./../models/user");
const Follower = require("./../models/follower");
const PredefinedLocation = require("./../models/predefinedLocation");
const Filter = require("./../models/filter");
const UserPreferences = require("./../models/userPreferences");
const Promise = require("bluebird");
const passport = require("passport");
const { unionBy } = require("lodash");

router.get(
  "/get",
  passport.authenticate(["jwt"], { session: false }),
  function(req, res) {
    var userId = req.user.id;

    User.findUserById(userId)
      .then(user => {
        Promise.all([
          Category.getCategories(),
          Tag.getTags(),
          Follower.getFollowers(userId),
          PredefinedLocation.getLocationById(user.location),
          PredefinedLocation.getLocations(),
          Filter.getFilters(userId),
          UserPreferences.getUserPreferences(userId),
          User.getUserById(userId)
        ])
          .spread(function(
            categories,
            tags,
            followers,
            location,
            predefinedLocations,
            filter,
            userPreferences,
            currentUser
          ) {
            const filterObj = filter && filter.toObject();
            const filterTags =
              filterObj && filterObj.filters && filterObj.filters["tags"];
            if (filterTags) {
              Tag.getCorrespondingTags(filterTags)
                .then(tagsFromFilter => {
                  return res.json({
                    categories,
                    tags: unionBy(tags, tagsFromFilter, tag => tag.id),
                    user,
                    followers,
                    location,
                    userId,
                    predefinedLocations,
                    filter,
                    userPreferences,
                    currentUser
                  });
                })
                .catch(err => {
                  console.log(err);
                  return res.status(500).send({
                    error: true,
                    message: err ? err.message : "Could not fetch initial data"
                  });
                });
            } else {
              return res.json({
                categories,
                tags,
                user,
                followers,
                location,
                userId,
                predefinedLocations,
                filter,
                userPreferences,
                currentUser
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            return res.status(500).send({
              error: true,
              message: err ? err.message : "Could not fetch initial data"
            });
          });
      })
      .catch(function(err) {
        console.log(err);
        return res.status(500).send({
          error: true,
          message: "Could not get user"
        });
      });
  }
);

module.exports = router;
