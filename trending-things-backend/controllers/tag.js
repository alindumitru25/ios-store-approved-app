const express = require("express");
const router = express.Router();
const Tag = require("./../models/tag");
const Filter = require("./../models/filter");
const passport = require("passport");
const { unionBy } = require("lodash");
const Promise = require("bluebird");

router.get(
  "/getTags",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    const userId = req.user.id;
    Promise.all([Tag.getTags(), Filter.getFilters(userId)])
      .spread((tags, filter) => {
        const filterObj = filter && filter.toObject();
        const filterTags =
          filterObj && filterObj.filters && filterObj.filters["tags"];

        if (filterTags) {
          Tag.getCorrespondingTags(filterTags)
            .then(tagsFromFilter => {
              return res.json({
                tags: unionBy(tags, tagsFromFilter, tag => tag.id)
              });
            })
            .catch(err => {
              reject(err);
            });
        } else {
          return res.json({
            tags
          });
        }
      })
      .catch(err => {
        return res.status(500).send({
          message: "Could not get tags"
        });
      });
  }
);

router.post(
  "/addTag",
  passport.authenticate(["jwt"], { session: false }),
  (req, res) => {
    const tagName = req.body.tagName;
    if (!tagName) {
      return res.status(400).send({
        message: "Wrong parameters sent"
      });
    }

    Tag.getTagByName(tagName)
      .then(tag => {
        if (!tag) {
          Tag.createNewTag(tagName)
            .then(newTag => {
              return res.json({
                tag: newTag
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).send({
                message: "Could not create tag"
              });
            });
        } else {
          return res.json({
            tag
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send({
          message: "Could not get/create tag"
        });
      });
  }
);

module.exports = router;
