const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const fs = require("fs");
const Grid = require("gridfs-stream");
const GridFs = Grid(Mongoose.connection.db, Mongoose.mongo);
const bcrypt = require("bcrypt");
const path = require("path");
const Jimp = require("jimp");
const transport = require("./../email/email");
const crypto = require("crypto");
const EmailTemplate = require("email-templates").EmailTemplate;
const Handlebars = require("handlebars");
const { map } = require("lodash");

Handlebars.registerHelper("link", function(url) {
  url = Handlebars.escapeExpression(url);

  return new Handlebars.SafeString("<a href='" + url + "'>" + url + "</a>");
});

var userSchema = new Mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  avatarId: { type: String },
  followersCount: { type: Number },
  location: { type: Number },
  isAdmin: { type: Number },
  facebookId: { type: String },
  passwordResetToken: { type: String },
  activated: { type: Boolean },
  activateToken: { type: String }
});

userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "id",
  startAt: 1
});
var User = Mongoose.model("User", userSchema);

function getPublicFieldsFromUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarId: user.avatarId,
    followersCount: user.followersCount,
    location: user.location,
    isAdmin: user.isAdmin,
    facebookId: user.facebookId
  };
}

function comparePassword(receivedPassword, password, next) {
  bcrypt.compare(receivedPassword, password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
}

function encryptPassword(password, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return next(err, hash);
    });
  });
}

function loadEmailTemplate(templateName, context) {
  let template = new EmailTemplate(
    path.join(__dirname + "/../email/", "templates", templateName)
  );

  return new Promise((resolve, reject) => {
    template.render(context, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// checks token uniqueness for small generated tokens
async function generateResetToken(size) {
  let token;
  let alreadyExistingToken = false;
  do {
    token = crypto.randomBytes(size).toString("hex");
    alreadyExistingToken = await User.findOne({ passwordResetToken: token });
  } while (alreadyExistingToken);

  return token;
}

exports.findUser = function(email, next) {
  User.findOne(
    {
      email: email
    },
    function(err, user) {
      if (err) next(new Error("could not find user matching criteria"));
      next(null, user);
    }
  );
};

getUserById = userId =>
  new Promise((resolve, reject) => {
    User.findOne({ id: userId })
      .then(user => resolve(getPublicFieldsFromUser(user)))
      .catch(err => reject(err));
  });

exports.getUserById = getUserById;

exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    User.find({})
      .then(function(users) {
        var usersArr = {};

        users.forEach(function(user) {
          usersArr[user.id] = user;
        });

        resolve(usersArr);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.createUser = function(
  firstName,
  lastName,
  email,
  password,
  location,
  next
) {
  encryptPassword(password, function(err, hash) {
    if (err) return next(err);

    var newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      location,
      isAdmin: false,
      activated: false
    });

    newUser.save(function(err) {
      if (err && err.code === 11000) {
        return next(Error("Duplicate user"));
      } else if (err) {
        next(Error(err));
      }

      // send activation email
      // generate token
      const token = crypto.randomBytes(16).toString("hex");
      newUser.activateToken = token;
      newUser
        .save(() => {
          const mailOptions = {
            FromEmail: "trendingthings@zoho.com",
            FromName: "Produse Trending",
            Subject: "Confirm Produse Trending Account",
            "Html-part":
              'Confirm account by clicking: <a href="https://trendingthings.ro:8443/user/activate/' +
              token +
              '">here</a> <br /><br />Best regards,<br />Produse Trending Team',
            Recipients: [{ Email: email }]
          };

          transport
            .request(mailOptions)
            .then(() => {
              next(null, newUser);
            })
            .catch(err => {
              next(err);
            });
        })
        .catch(err => next(Error(err)));
    });
  });
};

exports.findUserById = function(id) {
  return new Promise(function(resolve, reject) {
    User.findOne({
      id: id
    })
      .then(function(user) {
        resolve(user);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.saveAvatar = function(file, name, userId, next) {
  var writeStream = GridFs.createWriteStream({
    filename: name,
    metadata: {
      userId
    }
  });

  writeStream.on("close", function(file) {
    User.findOne(
      {
        id: userId
      },
      function(err, user) {
        if (err || !user) next(err);
        var currentAvatarId = user.avatarId;
        if (currentAvatarId) {
          // delete the old file
          GridFs.exist({ _id: currentAvatarId }, function(err, found) {
            if (found) {
              GridFs.remove({ _id: currentAvatarId });
            }
          });
        }
        // update user avatar id
        user.avatarId = file._id;
        user.save();
        next(null, file);
      }
    );
  });

  var temp_path = "avatar_temp.jpg";

  Jimp.read(file)
    .then(function(img) {
      img
        .resize(320, Jimp.AUTO)
        .quality(65)
        .write(temp_path, () => {
          fs.createReadStream(temp_path).pipe(writeStream);
        });
    })
    .catch(function(err) {
      next("Could not process image through jimp");
    });
};

exports.getAvatar = function(id, res, next) {
  GridFs.exist({ _id: id }, function(err, found) {
    if (found) {
      try {
        var readStream = GridFs.createReadStream({ _id: id });
        readStream.pipe(res);
      } catch (err) {}
    } else {
      // serve a standard avatar
      try {
        var readStream = fs.createReadStream(
          path.join(__dirname, "/../assets/user-icon.jpg")
        );
        readStream.pipe(res);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

exports.incrementFollowersCount = function(userId, next) {
  User.findOneAndUpdate(
    { id: userId },
    { $inc: { followersCount: 1 } },
    { new: true },
    function(err, user) {
      if (err) {
        return next(err);
      }

      return next(null, user);
    }
  );
};

exports.decrementFollowersCount = userId =>
  new Promise((resolve, reject) =>
    User.findOneAndUpdate(
      { id: userId },
      { $inc: { followersCount: -1 } },
      { new: true }
    )
      .then(user => resolve(user))
      .catch(err => reject(err))
  );

exports.findOrCreateFromFacebook = profile =>
  new Promise((resolve, reject) => {
    User.findOne({
      $or: [{ facebookId: profile.id }, { email: profile.emails[0].value }]
    })
      .then(user => {
        if (!user) {
          const newUser = new User({
            firstName: profile.name.givenName + " " + profile.name.middleName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            isAdmin: false,
            facebookId: profile.id
          });

          newUser
            .save()
            .then(() => resolve(newUser))
            .catch(err => reject(err));
        } else {
          if (!user.facebookId) {
            user.facebookId = profile.id;
            user
              .save()
              .then(() => {
                resolve(user);
              })
              .catch(err => {
                reject(err);
              });
          } else {
            resolve(user);
          }
        }
      })
      .catch(err => reject(err));
  });

exports.setLocation = (userId, locationId) =>
  new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { id: userId },
      { $set: { location: locationId } },
      { new: true }
    )
      .then(location => resolve(location))
      .catch(err => reject(err));
  });

exports.resetPassword = (token, newPassword) =>
  new Promise((resolve, reject) => {
    User.findOne({
      passwordResetToken: token
    })
      .then(user => {
        if (!user) {
          reject("invalid token");
        } else {
          encryptPassword(newPassword, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              user.password = hash;
              user
                .save()
                .then(() => {
                  resolve();
                })
                .catch(err => reject(err));
            }
          });
        }
      })
      .catch(err => {
        reject(err);
      });
  });

async function sendResetEmail(email) {
  const resetToken = await generateResetToken(4);
  new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          resolve();
        } else {
          user.passwordResetToken = resetToken;

          user
            .save(() => {
              const mailOptions = {
                FromEmail: "trendingthings@zoho.com",
                FromName: "Produse Trending",
                Subject: "Password reset",
                "Text-part": "Password reset token " + resetToken,
                Recipients: [{ Email: email }]
              };

              transport
                .request(mailOptions)
                .then(() => {
                  resolve();
                })
                .catch(err => {
                  console.log(err);
                  reject(err);
                });
            })
            .catch(err => {
              resolve();
            });
        }
      })
      .catch(err => {
        // fail silently
        resolve();
      });
  });
}

exports.activateUser = token =>
  new Promise((resolve, reject) => {
    User.findOne({
      activateToken: token
    })
      .then(user => {
        if (!user) {
          reject(err);
        } else {
          user.activated = true;
          user
            .save()
            .then(() => {
              resolve(user);
            })
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });

exports.changePassword = (userId, oldPassword, newPassword) =>
  new Promise((resolve, reject) => {
    User.findOne({
      id: userId
    })
      .then(user => {
        comparePassword(oldPassword, user.password, (err, isMatch) => {
          if (err || !isMatch) {
            reject(err);
          } else {
            encryptPassword(newPassword, function(err, hash) {
              if (err || !hash) {
                reject(err);
              } else {
                user.password = hash;
                user
                  .save()
                  .then(() => resolve(user))
                  .catch(err => reject(err));
              }
            });
          }
        });
      })
      .catch(err => reject(err));
  });

getEntityWithUser = entity =>
  new Promise((resolve, reject) => {
    getUserById(entity.userId)
      .then(user => {
        resolve({
          ...(entity.toObject ? entity.toObject() : entity),
          user: getPublicFieldsFromUser(user)
        });
      })
      .catch(err => {
        reject(err);
      });
  });

exports.getEntityWithUser = getEntityWithUser;

exports.getEntitiesWithUsers = entities =>
  new Promise((resolve, reject) => {
    const users = map(entities, entity => getEntityWithUser(entity));

    Promise.reduce(
      users,
      (entitiesWithUsers, entityWithUser) => {
        return (entitiesWithUsers[entityWithUser.id] = {
          ...entitiesWithUsers,
          [entityWithUser.id]: entityWithUser
        });
      },
      {}
    )
      .then(docs => {
        resolve(docs);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.sendResetEmail = sendResetEmail;
