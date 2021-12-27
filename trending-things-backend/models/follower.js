var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;
var path = require("path");

var followerSchema = new Mongoose.Schema({
  follower: { type: Number, required: true },
  followee: { type: Number, required: true },
  start: { type: Date },
  end: { type: Date }
});

var Follower = Mongoose.model("Follower", followerSchema);

exports.getUserFollowers = function(userId, next) {};

exports.followUser = function(followerId, followeeId, next) {
  var newFollower = new Follower({
    follower: followerId,
    followee: followeeId,
    start: new Date()
  });

  newFollower.save(function(err) {
    if (err) {
      return next(err);
    }

    next(null, newFollower);
  });
};

exports.unFollowUser = (followerId, followeeId) =>
  new Promise((resolve, reject) =>
    Follower.findOneAndRemove({ follower: followerId, followee: followeeId })
      .then(resolve())
      .catch(err => reject(err))
  );

exports.isFollowed = function(followerId, followeeId, next) {
  Follower.findOne(
    {
      follower: followerId,
      followee: followeeId
    },
    function(err, follower) {
      if (err || follower) {
        return next(true);
      }

      return next(false);
    }
  );
};

exports.getFollowers = function(userId) {
  return new Promise(function(resolve, reject) {
    Follower.find({
      follower: userId
    })
      .then(function(followers) {
        var followersArr = {};
        followers.forEach(function(follower) {
          followersArr[follower.followee] = follower;
        });

        resolve(followersArr);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.getFollowersIds = function(userId) {
  return new Promise(function(resolve, reject) {
    Follower.find({
      follower: userId
    })
      .then(function(followers) {
        var followersIds = [];
        followers.forEach(function(follower) {
          followersIds.push(follower.followee);
        });

        resolve(followersIds);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
