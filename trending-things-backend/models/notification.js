const fs = require("fs");
const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const _ = require("lodash");
const Document = require("./../models/document");
const User = require("./../models/user");
const MongooseMap = require("mongoose-map")(Mongoose);
const moment = require("moment");

const SOCKET_NOTIFICATIONS_UPDATE = "SOCKET/SOCKET_NOTIFICATIONS_UPDATE";

const notificationSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    description: { type: String, required: true },
    notificationType: { type: String, required: true },
    userId: { type: Number, required: true },
    triggerUserId: { type: Number },
    triggerUsername: { type: String },
    documentId: { type: Number },
    seen: { type: Boolean },
    checked: { type: Boolean }
  },
  {
    timestamps: true
  }
);

notificationSchema.plugin(autoIncrement.plugin, {
  model: "Notification",
  field: "id",
  startAt: 1
});

const Notification = Mongoose.model("Notification", notificationSchema);

addNotification = (
  userId,
  description,
  notificationType,
  triggerUserId,
  documentId,
  triggerUsername
) =>
  new Promise((resolve, reject) => {
    const newNotification = new Notification({
      description,
      notificationType,
      userId,
      triggerUserId,
      documentId,
      triggerUsername,
      seen: false,
      checked: false
    });

    newNotification
      .save()
      .then(() => resolve(newNotification))
      .catch(err => {
        reject(err);
      });
  });

exports.addNotification = addNotification;

exports.addDocumentNotification = (
  documentId,
  triggerUserId,
  type,
  notificationDescription,
  socket,
  notifyId
) =>
  new Promise((resolve, reject) => {
    Document.getDocumentById(documentId)
      .then(document => {
        // notify id if passed otherwise we just assume we're going to notify document owner
        const addToUserId = notifyId || document.userId;

        // fail silently otherwise
        if (triggerUserId !== addToUserId) {
          Promise.all([
            User.getUserById(triggerUserId),
            User.getUserById(addToUserId)
          ])
            .spread((triggerUser, user) => {
              const triggerUsername = `${triggerUser.firstName} ${
                triggerUser.lastName
              }`;
              const description = notificationDescription;

              addNotification(
                addToUserId,
                description,
                type,
                triggerUserId,
                documentId,
                triggerUsername
              )
                .then(notification => {
                  // notify subscribers
                  socket.emit(SOCKET_NOTIFICATIONS_UPDATE + "/" + addToUserId, {
                    notifications: {
                      [notification.id]: notification
                    }
                  });
                  resolve(notification);
                })
                .catch(err => {
                  reject(notification);
                });
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

exports.addGeneralNotification = (
  triggerUserId,
  userId,
  type,
  notificationDescription,
  socket
) =>
  new Promise((resolve, reject) => {
    if (triggerUserId !== userId) {
      Promise.all([User.getUserById(triggerUserId), User.getUserById(userId)])
        .spread((triggerUser, user) => {
          const triggerUsername = `${triggerUser.firstName} ${
            triggerUser.lastName
          }`;
          const description = notificationDescription;
          addNotification(
            userId,
            description,
            type,
            triggerUserId,
            null,
            triggerUsername
          )
            .then(notification => {
              // notify subscribers
              socket.emit(SOCKET_NOTIFICATIONS_UPDATE + "/" + userId, {
                notifications: {
                  [notification.id]: notification
                }
              });
              resolve(notification);
            })
            .catch(err => {
              reject(notification);
            });
        })
        .catch(err => {
          reject(err);
        });
    }
  });

exports.getNotifications = userId =>
  new Promise((resolve, reject) => {
    const oneWeekExpiryVis = new Date(
      new Date().getTime() - 12 * 24 * 60 * 60 * 1000
    );
    Notification.find({
      userId,
      $or: [
        { checked: false },
        {
          $and: [{ checked: true }, { createdAt: { $gte: oneWeekExpiryVis } }]
        }
      ]
    })
      .sort({
        createdAt: "desc"
      })
      .then(notifications => {
        resolve(notifications);
      })
      .catch(err => reject(err));
  });

const markSeen = notification =>
  new Promise((resolve, reject) => {
    notification.seen = true;

    notification
      .save()
      .then(() => {
        resolve(notification);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.markUnseenNotificationsAsSeen = userId =>
  new Promise((resolve, reject) => {
    Notification.find({
      userId,
      seen: false
    })
      .then(notifications => {
        const promiseMarkedSeen = notifications.map(markSeen);
        Promise.all(promiseMarkedSeen)
          .then(markedNotifications => {
            resolve(markedNotifications);
          })
          .catch(err => {
            reject(err);
          });
        resolve(notifications);
      })
      .catch(err => reject(err));
  });

exports.markAsChecked = id =>
  new Promise((resolve, reject) => {
    Notification.findOneAndUpdate(
      { id },
      { $set: { checked: true } },
      { new: true }
    )
      .then(notification => resolve(notification))
      .catch(err => reject(err));
  });
