var Promise = require("bluebird");
var Mongoose = require("mongoose");
Mongoose.Promise = Promise;

var categorySchema = new Mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String },
  translation: { type: String }
});

var Category = Mongoose.model("Category", categorySchema);

exports.getCategories = function() {
  return new Promise(function(resolve, reject) {
    Category.find({})
      .then(function(categories) {
        var categoriesArr = [];

        categories.forEach(function(category) {
          categoriesArr.push(category);
        });

        resolve(categoriesArr);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
