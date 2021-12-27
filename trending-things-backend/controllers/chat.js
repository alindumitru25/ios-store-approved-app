const express = require("express");
const User = require("./../models/user");
const Promise = require("bluebird");
const passport = require("passport");
const Chat = require("./../models/chat");
const Message = require("./../models/message");
const multer = require("multer");
const upload = multer({ dest: "upload/" });

const SOCKET_MESSAGES_UPDATE = "SOCKET/CHAT_MESSAGES_UPDATE";
const SOCKET_CHATS_UPDATE = "SOCKET/CHATS_UPDATE";

module.exports = function(socket) {
  const router = express.Router();

  router.get(
    "/getMessages",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      const senderUserId = req.user.id;
      const receiverUserId = req.query.receiverUserId;

      if (!receiverUserId) {
        return res.status(400).send({
          message: "Incorrect parameters sent"
        });
      }

      Chat.getChat(senderUserId, receiverUserId)
        .then(chat => {
          if (!chat) {
            User.getUserById(receiverUserId)
              .then(user => {
                return res.json({
                  receiverUser: user
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).send({
                  error: true,
                  message: err || "Could not get chat"
                });
              });
          } else {
            Promise.all([
              Message.getMessages(chat.id, senderUserId),
              User.getUserById(receiverUserId)
            ]).spread((messages, user) => {
              console.log(user);
              return res.json({
                chat,
                messages,
                receiverUser: user
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({
            error: true,
            message: err || "Could not get chat"
          });
        });
    }
  );

  router.post(
    "/addMessage",
    passport.authenticate(["jwt"], { session: false }),
    upload.single("image"),
    (req, res) => {
      const senderUserId = req.user.id;
      const receiverUserId = req.body.receiverUserId;

      Chat.addMessageToChat(
        senderUserId,
        receiverUserId,
        req.body.message,
        req.file ? req.file.path : undefined
      )
        .then(({ chat, message }) => {
          // update receiver
          socket.emit(SOCKET_MESSAGES_UPDATE + "/" + receiverUserId, {
            message: {
              ...message,
              user: {
                ...message.user,
                _id: 1
              }
            }
          });

          socket.emit(SOCKET_CHATS_UPDATE + "/" + receiverUserId, {
            chat
          });

          return res.json({
            chat,
            message
          });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not add message"
          });
        });
    }
  );

  router.get(
    "/getChats",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      const userId = req.user.id;
      Chat.getUserChats(userId)
        .then(chats => {
          return res.json({
            chats
          });
        })
        .catch(err => {
          return res.status(500).send({
            error: true,
            message: err || "Could not get chats"
          });
        });
    }
  );

  router.patch(
    "/markAsSeen",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      const userId = req.user.id;

      if (!req.body.chatId) {
        return res.status(400).send({
          message: "Incorrect parameters sent"
        });
      }

      Chat.markAsSeen(req.body.chatId, userId)
        .then(chats => {
          return res.json({
            chats
          });
        })
        .catch(err => {
          return res.status(500).send({
            error: true,
            message: err || "Could mark as seen"
          });
        });
    }
  );

  return router;
};
