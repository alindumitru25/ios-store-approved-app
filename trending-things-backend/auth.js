// auth.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cfg = require("./configs/authConfig.js");
const User = require("./models/user");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const jwt = require("jwt-simple");
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const FACEBOOK_APP_ID = "";
const FACEBOOK_APP_SECRET = "";

const logger = require("./logger/logger");

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    User.findUserById(payload.id)
      .then(function(user) {
        done(null, {
          id: user.id
        });
      })
      .catch(function(err) {
        return done(err, null);
      });
  });
  passport.use(strategy);
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOrCreateFromFacebook(profile)
          .then(user => {
            const payload = {
              id: user.id
            };
            const token = jwt.encode(payload, cfg.jwtSecret);
            return done(undefined, {
              user,
              token
            });
          })
          .catch(err => {
            return done(err, null);
          });
      }
    )
  );
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
