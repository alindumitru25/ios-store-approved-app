const fs = require("fs");
const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const _ = require("lodash");
const User = require("./../models/user");
const Message = require("./../models/message");
const MongooseMap = require("mongoose-map")(Mongoose);
const moment = require("moment");

// store messages separetely based on chat id - chat links two participants
const chatSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    participant1: { type: Number, required: true },
    participant2: { type: Number, required: true },
    lastMessage: { type: String },
    totalMessages: { type: Number },
    lastSender: { type: Number },
    newMessages: { type: MongooseMap }
  },
  {
    timestamps: true
  }
);

chatSchema.index({ participant1: 1, participant2: 1 }, { unique: true });

chatSchema.plugin(autoIncrement.plugin, {
  model: "Chat",
  field: "id",
  startAt: 1
});

const Chat = Mongoose.model("Chat", chatSchema);

const mapChat = chat =>
  new Promise((resolve, reject) => {
    Promise.all([
      User.findUserById(chat.participant1),
      User.findUserById(chat.participant2)
    ])
      .spread((userParticipant1, userParticipant2) => {
        const composedChat = {
          ...chat.toObject(),
          userParticipant1: userParticipant1,
          userParticipant2: userParticipant2
        };

        resolve(composedChat);
      })
      .catch(err => reject(err));
  });

const mapChats = chats =>
  new Promise((resolve, reject) => {
    const mappedChatsPromises = chats.map(mapChat);
    const res = Promise.all(mappedChatsPromises);

    res.then(chats => resolve(chats)).catch(err => reject(err));
  });

const getCreateChat = (senderUserId, receiverUserId) =>
  new Promise((resolve, reject) => {
    Chat.findOne({
      $or: [
        { participant1: senderUserId, participant2: receiverUserId },
        { participant2: senderUserId, participant1: receiverUserId }
      ]
    }).then(chat => {
      if (!chat) {
        const newChat = new Chat({
          participant1: senderUserId,
          participant2: receiverUserId
        });

        newChat
          .save()
          .then(() => resolve(newChat))
          .catch(err => reject(err));
      } else {
        resolve(chat);
      }
    });
  });

exports.getChat = (senderUserId, receiverUserId) =>
  new Promise((resolve, reject) => {
    Chat.findOne({
      $or: [
        { participant1: senderUserId, participant2: receiverUserId },
        { participant2: senderUserId, participant1: receiverUserId }
      ]
    })
      .then(chat => {
        resolve(chat);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.addMessageToChat = (senderUserId, receiverUserId, text, photo) =>
  new Promise((resolve, reject) => {
    getCreateChat(senderUserId, receiverUserId).then(chat => {
      Message.addMessage(chat.id, senderUserId, text, photo)
        .then(message => {
          const objChat = chat.toObject();
          chat.lastMessage = text || "Image";
          chat.totalMessages = chat.totalMessages ? chat.totalMessages + 1 : 1;
          chat.lastSender = senderUserId;
          if (!chat.newMessages) {
            chat.newMessages = {};
            objChat.newMessages = {};
          }

          chat.newMessages = {
            ...objChat.newMessages,
            [receiverUserId]: objChat.newMessages[receiverUserId]
              ? objChat.newMessages[receiverUserId] + 1
              : 1
          };

          chat.save().then(() => {
            mapChat(chat)
              .then(mappedChat => {
                resolve({ chat: mappedChat, message });
              })
              .catch(err => reject(err));
          });
        })
        .catch(err => reject(err));
    });
  });

exports.getUserChats = userId =>
  new Promise((resolve, reject) => {
    Chat.find({
      $or: [{ participant1: userId }, { participant2: userId }]
    })
      .then(chats =>
        mapChats(chats)
          .then(chats => {
            const chatsArr = {};

            chats.forEach(chat => {
              chatsArr[chat.id] = chat;
            });
            resolve(chatsArr);
          })
          .catch(err => reject(err))
      )
      .catch(err => reject(err));
  });

exports.markAsSeen = (chatId, userId) =>
  new Promise((resolve, reject) => {
    Chat.findOne({
      id: chatId
    })
      .then(chat => {
        if (chat.newMessages) {
          const objChat = chat.toObject();
          const newMsg = {
            ...objChat.newMessages,
            [userId]: 0
          };
          chat.newMessages = newMsg;
        }

        chat.save().then(savedChat => {
          mapChat(savedChat)
            .then(composedChat => {
              resolve({
                [composedChat.id]: composedChat
              });
            })
            .catch(err => reject(err));
        });
      })
      .catch(err => reject(err));
  });
