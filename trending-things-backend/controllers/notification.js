const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const Promise = require("bluebird");
const passport = require("passport");
const Notification = require("./../models/notification");

router.get(
  "/get",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    const userId = req.user.id;

    Notification.getNotifications(userId)
      .then(notifications => {
        const notificationsArr = {};

        notifications.forEach(notification => {
          notificationsArr[notification.id] = notification;
        });

        return res.json({
          notifications: notificationsArr
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send({
          error: true,
          message: err || "Could not get notifications"
        });
      });
  }
);

router.patch(
  "/seenAll",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    const userId = req.user.id;

    Notification.markUnseenNotificationsAsSeen(userId)
      .then(notifications => {
        const notificationsArr = {};
        notifications.forEach(notification => {
          notificationsArr[notification.id] = notification;
        });

        return res.json({
          notifications: notificationsArr
        });
      })
      .catch(err => {
        return res.status(500).send({
          error: true,
          message: err || "Could not mark notifications as seen"
        });
      });
  }
);

router.patch(
  "/checked",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    const userId = req.user.id;

    if (!req.body.notificationId) {
      return res.status(400).send({
        error: true,
        message: "Incorrect request parameters sent"
      });
    }

    Notification.markAsChecked(req.body.notificationId)
      .then(notification => {
        return res.json({
          notifications: {
            [notification.id]: notification
          }
        });
      })
      .catch(err => {
        return res.status(500).send({
          error: true,
          message: err || "Could not mark notification as checked"
        });
      });
  }
);

module.exports = router;
