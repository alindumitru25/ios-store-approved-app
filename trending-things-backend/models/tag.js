const Promise = require("bluebird");
const Mongoose = require("mongoose");
Mongoose.Promise = Promise;

const tagSchema = new Mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  translation: { type: String },
  usage: { type: Number }
});

tagSchema.plugin(autoIncrement.plugin, {
  model: "Tag",
  field: "id",
  startAt: 1
});
const Tag = Mongoose.model("Tag", tagSchema);

exports.getTags = function() {
  return new Promise(function(resolve, reject) {
    Tag.find({})
      .sort({ usage: -1 })
      .limit(20)
      .then(function(tags) {
        var tagsArr = [];

        tags.forEach(function(tag) {
          tagsArr.push(tag);
        });

        resolve(tagsArr);
      })
      .catch(function(err) {
        reject(tags);
      });
  });
};

exports.incrementTagUsage = tagId =>
  new Promise((resolve, reject) => {
    Tag.findOneAndUpdate({ id: tagId }, { $inc: { usage: 1 }, new: true })
      .then(tag => {
        resolve(tag);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.getTagByName = tagName =>
  new Promise((resolve, reject) => {
    Tag.findOne({
      name: tagName
    })
      .then(tag => {
        resolve(tag);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.createNewTag = tagName =>
  new Promise((resolve, reject) => {
    const tag = new Tag({
      name: tagName
    });

    tag
      .save()
      .then(() => {
        resolve(tag);
      })
      .catch(err => {
        reject(err);
      });
  });

getOrCreateTag = customTag =>
  new Promise((resolve, reject) => {
    Tag.findOne({
      name: customTag
    }).then(tag => {
      if (!tag) {
        const newTag = new Tag({
          name: customTag
        });

        newTag
          .save()
          .then(() => {
            resolve(newTag);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(tag);
      }
    });
  });

exports.getTagsFromCustomTags = customTags =>
  new Promise((resolve, reject) => {
    mappedTags = customTags.map(getOrCreateTag);
    Promise.all(mappedTags)
      .then(tags => {
        resolve(tags);
      })
      .catch(err => {
        reject(err);
      });
  });

exports.getCorrespondingTags = tags =>
  new Promise((resolve, reject) => {
    Tag.find({
      id: { $in: tags }
    })
      .then(tags => {
        resolve(tags);
      })
      .catch(err => {
        reject(err);
      });
  });
