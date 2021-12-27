const fs = require("fs");
const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;
const _ = require("lodash");
const User = require("./../models/user");
const MongooseMap = require("mongoose-map")(Mongoose);
const moment = require("moment");
const GLOBAL_URL = require("./../utils/Globals");

const Grid = require("gridfs-stream");
const GridFs = Grid(Mongoose.connection.db, Mongoose.mongo);
const path = require("path");
const Jimp = require("jimp");

// store messages separetely based on chat id - chat links two participants
const messageSchema = new Mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    senderId: { type: Number, required: true },
    chatId: { type: Number, required: true },
    text: { type: String },
    imageId: { type: String }
  },
  {
    timestamps: true
  }
);

messageSchema.plugin(autoIncrement.plugin, {
  model: "Message",
  field: "id",
  startAt: 1
});

const Message = Mongoose.model("Message", messageSchema);

const mapMessage = (message, userId) =>
  new Promise((resolve, reject) => {
    User.findUserById(message.senderId)
      .then(user => {
        const objMessage = message.toObject();
        const composedMessage = {
          ...objMessage,
          user: {
            _id: userId !== user.id ? 1 : undefined,
            name: user.firstName + " " + user.lastName,
            avatar: GLOBAL_URL + "/user/avatar/" + user.id,
            id: user.id
          },
          image: objMessage.imageId
            ? GLOBAL_URL + "/image/image/" + objMessage.imageId
            : undefined
        };
        resolve(composedMessage);
      })
      .catch(err => reject(err));
  });

const mapMessages = (messages, userId) =>
  new Promise((resolve, reject) => {
    const mappedPromises = messages.map(m => mapMessage(m, userId));
    const res = Promise.all(mappedPromises);

    res
      .then(mappedMessages => {
        resolve(mappedMessages);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.getMessages = (chatId, userId) =>
  new Promise((resolve, reject) => {
    Message.find({
      chatId
    })
      .then(messages =>
        mapMessages(messages, userId).then(parsedMessages =>
          resolve(parsedMessages).catch(err => reject(err))
        )
      )
      .catch(err => reject(err));
  });

const putImage = file =>
  new Promise((resolve, reject) => {
    const temp_path = "messages_image_path.jpg";
    Jimp.read(file)
      .then(function(img) {
        const height = img.bitmap.width;
        let modify = height > 750 ? 2 : 1;

        img
          .resize(
            modify === 1 ? 750 : Jimp.AUTO,
            modify === 2 ? 750 : Jimp.AUTO
          )
          .quality(45)
          .write(temp_path, () => {
            var writeStream = GridFs.createWriteStream({
              filename: "messages_image_path"
            });
            writeStream.on("close", function(file) {
              resolve(file);
            });

            fs.createReadStream(temp_path).pipe(writeStream);
          });
      })
      .catch(err => {
        reject(err);
      });
  });

exports.addMessage = (chatId, senderId, message, photo) =>
  new Promise((resolve, reject) => {
    if (photo) {
      putImage(photo)
        .then(image => {
          console.log(image);
          const newMessage = new Message({
            chatId,
            senderId,
            text: message,
            imageId: image._id
          });

          newMessage
            .save()
            .then(() =>
              mapMessage(newMessage, senderId)
                .then(composedMessage => {
                  resolve(composedMessage);
                })
                .catch(err => reject(err))
            )
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    } else {
      const newMessage = new Message({
        chatId,
        senderId,
        text: message
      });

      newMessage
        .save()
        .then(() =>
          mapMessage(newMessage, senderId)
            .then(composedMessage => {
              resolve(composedMessage);
            })
            .catch(err => reject(err))
        )
        .catch(err => reject(err));
    }
  });
