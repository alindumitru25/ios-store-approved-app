var express = require("express");
var router = express.Router();
var Document = require("./../models/document");
var Follower = require("./../models/follower");
var Location = require("./../models/location");
var Filter = require("./../models/filter");
var User = require("./../models/user");
var PredefinedLocation = require("./../models/predefinedLocation");
var Notification = require("./../models/notification");
var Tag = require("./../models/tag");
var Promise = require("bluebird");
var passport = require("passport");
var multer = require("multer");
var upload = multer({ dest: "upload/" });
const { union, map } = require("lodash");

module.exports = function(socket) {
  var router = express.Router();
  router.get(
    "/get",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      var pagination = req.body.pagination ? req.body.pagination : 0;

      User.findUserById(userId)
        .then(function(user) {
          // get user location by user location id & followers
          Promise.all([
            PredefinedLocation.getLocationById(user.location),
            Follower.getFollowersIds(userId),
            Filter.getFilters(userId)
          ])
            .spread(function(location, followers, filter) {
              Document.queryDocuments(location, followers, filter, pagination)
                .then(function({ documentsMap, trendingDocumentsIds }) {
                  User.getEntitiesWithUsers(documentsMap)
                    .then(docs => {
                      return res.json({
                        documents: docs,
                        trendingDocumentsIds
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      return res.status(500).send({
                        error: true,
                        message: err || "Could not get documents"
                      });
                    });
                })
                .catch(function(err) {
                  console.log(err);
                  return res.status(500).send({
                    error: true,
                    message: err || "Could not get documents"
                  });
                });
            })
            .catch(function(err) {
              console.log(err);
              return res.status(500).send({
                message: err || "Could not get location of user"
              });
            });
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).send({
            message: err || "Could not get user"
          });
        });
    }
  );

  router.get(
    "/searchByText",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      const userId = req.user.id;
      if (!req.query.searchText) {
        return res.status(500).send({
          message: "Incorrect parameters sent"
        });
      }

      User.findUserById(userId)
        .then(function(user) {
          // get user location by user location id & followers
          Promise.all([
            PredefinedLocation.getLocationById(user.location),
            Filter.getFilters(userId)
          ])
            .spread((location, userId, filter) => {
              Document.findDocumentsByText(
                req.query.searchText,
                location,
                filter,
                req.query.pagination
              )
                .then(({ documents, searchIds }) => {
                  User.getEntitiesWithUsers(documents)
                    .then(docs => {
                      return res.json({
                        documents: docs,
                        searchIds
                      });
                    })
                    .catch(err => {
                      return res.status(500).send({
                        message: err || "Could not get documents"
                      });
                    });
                })
                .catch(err => {
                  return res.status(500).send({
                    message: err || "Could not get documents"
                  });
                });
            })
            .catch(err => {
              return res.status(500).send({
                message: err || "Could not get related data"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: err || "Could not get user"
          });
        });
    }
  );

  router.get(
    "/byUser/:userId",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      Document.getDocumentsByUser(req.params.userId, parseInt(req.query.skip))
        .then((documents, err) => {
          Promise.all([
            User.getEntitiesWithUsers(documents),
            User.getUserById(req.params.userId)
          ])
            .spread((mappedDocuments, user) => {
              return res.json({
                documents: mappedDocuments,
                user
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).send({
                error: true,
                message: err ? err.mesage : "Could not get documents"
              });
            });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({
            error: true,
            message: err ? err.mesage : "Could not get documents"
          });
        });
    }
  );

  router.get(
    "/byId/:id",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      Document.getDocumentById(req.params.id)
        .then(function(document) {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({
                document: mappedDocument
              });
            })
            .catch(err => {
              res.status(500).send({
                error: true,
                message: err ? err.mesage : "Could not get document"
              });
            });
        })
        .catch(function(err) {
          res.status(500).send({
            error: true,
            message: err ? err.mesage : "Could not get document"
          });
        });
    }
  );

  router.get(
    "/own",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Document.getDocumentsByUser(userId, function(documents, err) {
        if (err || !documents) {
          res.status(500).send({
            error: true,
            message: err ? err.mesage : "Could not get documents"
          });
        }

        User.getEntitiesWithUsers(documents)
          .then(mappedDocuments => {
            return res.json(mappedDocuments);
          })
          .catch(err => {
            res.status(500).send({
              error: true,
              message: err ? err.mesage : "Could not get documents"
            });
          });
      });
    }
  );

  router.post(
    "/createDocument",
    passport.authenticate(["jwt"], { session: false }),
    upload.single("image"),
    function(req, res) {
      var data = req.body;
      var userId = req.user.id;

      try {
        if (data.tags) {
          data.tags = JSON.parse(data.tags);
        }
        if (data.location) {
          data.location = JSON.parse(data.location);
        }
        if (data.customTags) {
          data.customTags = JSON.parse(data.customTags);
        }
      } catch (err) {
        console.log(err);
        return res.status(400).send({
          error: true,
          message: err
        });
      }

      if (!req.file || !data.description || !data.location) {
        return res.status(400).send({
          error: true,
          message: "Incorrect request parameters sent"
        });
      }

      // handle image upload
      Document.putImage(req.file.path, data.description, function(err, image) {
        if (err || !image) {
          return res.status(500).send({
            error: true,
            message: err ? err : "Unnable to upload image"
          });
        }

        // create location with description only if locationId is missing
        Location.getCreateLocation(data.location)
          .then(location => {
            const createDoc = (cImage, cData, cLocation, cUserId) => {
              createDocument(cImage._id, cData, cLocation, cUserId)
                .then(document => {
                  if (cData.tags) {
                    cData.tags.forEach(tag => {
                      Tag.incrementTagUsage(tag);
                    });
                  }

                  User.getEntityWithUser(document)
                    .then(mappedDocument => {
                      return res.json({
                        document: mappedDocument
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      return res.status(500).send({
                        error: true,
                        message: err ? err : "Could not create document"
                      });
                    });
                })
                .catch(err => {
                  console.log(err);
                  return res.status(500).send({
                    error: true,
                    message: err ? err : "Could not create document"
                  });
                });
            };

            if (!data.customTags) {
              createDoc(image, data, location, userId);
            } else {
              Tag.getTagsFromCustomTags(data.customTags)
                .then(tags => {
                  const tagIds = map(tags, tag => tag.id);
                  data.tags = union(data.tags || [], tagIds);

                  createDoc(image, data, location, userId);
                })
                .catch(err => {
                  console.log(err);
                  return res.status(500).send({
                    error: true,
                    message: err ? err : "Could not create tags"
                  });
                });
            }
          })
          .catch(err => {
            console.log(err);
            return res.status(500).send({
              error: true,
              message: err ? err : "Could not get/create location"
            });
          });
      });
    }
  );

  function createDocument(imageId, data, location, userId, res) {
    return new Promise((resolve, reject) => {
      if (data.tags) {
        Tag.getCorrespondingTags(data.tags)
          .then(tags => {
            Document.createDocument(
              imageId,
              data.description,
              data.price,
              data.categoryId,
              tags,
              location.id,
              {
                longitude: location.position[0],
                latitude: location.position[1]
              },
              location.description,
              location.formattedAddress,
              userId,
              function(err, document) {
                if (err || !document) {
                  reject(err);
                } else {
                  resolve(document);
                }
              }
            );
          })
          .catch(err => {
            reject(err);
          });
      } else {
        Document.createDocument(
          imageId,
          data.description,
          data.price,
          data.categoryId,
          data.tags,
          location.id,
          {
            longitude: location.position[0],
            latitude: location.position[1]
          },
          location.description,
          location.formattedAddress,
          userId,
          function(err, document) {
            if (err || !document) {
              reject(err);
            } else {
              resolve(document);
            }
          }
        );
      }
    });
  }

  router.put(
    "/feedback/quality",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Document.feedbackQuality(req.body.documentId, userId)
        .then(function(document) {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/quality",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Document.unfeedbackQuality(req.body.documentId, userId)
        .then(function(document) {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/goodPrice",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Document.feedbackGoodPrice(req.body.documentId, userId)
        .then(function(document) {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/goodPrice",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      var userId = req.user.id;
      Document.unfeedbackGoodPrice(req.body.documentId, userId)
        .then(function(document) {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(function(err) {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/goodQualityPrice",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.feedbackGoodQualityPrice(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/goodQualityPrice",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.unfeedbackGoodQualityPrice(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give  feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give  feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/worthIt",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.feedbackWorthIt(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/worthIt",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.unfeedbackWorthIt(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/expensive",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.feedbackExpensive(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/expensive",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.unfeedbackExpensive(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/badQuality",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.feedbackBadQuality(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              Notification.addDocumentNotification(
                req.body.documentId,
                userId,
                "reaction",
                "reacted.to.your.product",
                socket
              );
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/unfeedback/badQuality",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      var userId = req.user.id;
      Document.unfeedbackBadQuality(req.body.documentId, userId)
        .then(document => {
          User.getEntityWithUser(document)
            .then(mappedDocument => {
              return res.json({ document: mappedDocument });
            })
            .catch(err => {
              return res.status(500).send({
                message: "Could not give feedback"
              });
            });
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not give feedback"
          });
        });
    }
  );

  router.put(
    "/feedback/interaction",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      if (!req.body.documentId) {
        return res.status(400).send({
          error: true,
          message: "Incorrect parameters sent"
        });
      }

      Document.registerInteraction(req.body.documentId).catch(function(err) {
        return res.status(500).send({
          error: true,
          message: "Could not register interaction"
        });
      });
    }
  );

  router.patch(
    "/markEditorChoice",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      const userId = req.user.id;
      User.findUserById(userId)
        .then(user => {
          if (!user || !user.isAdmin) {
            return res.status(403).send({
              error: true,
              message: "Not authorized"
            });
          } else {
            Document.markEditorChoice(req.body.documentId)
              .then(document => {
                User.getEntityWithUser(document)
                  .then(mappedDocument => {
                    return res.json({
                      document: mappedDocument
                    });
                  })
                  .catch(err => {
                    return res.status(500).send({
                      message: "Document operation unsuccessful"
                    });
                  });
              })
              .catch(err => {
                return res.status(500).send({
                  message: "Document operation unsuccessful"
                });
              });
          }
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not find user"
          });
        });
    }
  );

  router.patch(
    "/unmarkEditorChoice",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      const userId = req.user.id;
      User.findUserById(userId)
        .then(user => {
          if (!user || !user.isAdmin) {
            return res.status(403).send({
              error: true,
              message: "Not authorized"
            });
          } else {
            Document.unmarkEditorChoice(req.body.documentId)
              .then(document => {
                User.getEntityWithUser(document)
                  .then(mappedDocument => {
                    return res.json({
                      document: mappedDocument
                    });
                  })
                  .catch(err => {
                    return res.status(500).send({
                      message: "Document operation unsuccessful"
                    });
                  });
              })
              .catch(err => {
                return res.status(500).send({
                  message: "Document operation unsuccessful"
                });
              });
          }
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not find user"
          });
        });
    }
  );

  router.patch(
    "/edit",
    passport.authenticate(["jwt"], { session: false }),
    function(req, res) {
      const userId = req.user.id;
      if (!req.body.documentId || !req.body.newPrice) {
        return res.status(500).send({
          message: "Incorrect parameters sent"
        });
      } else {
        Document.editDocument(req.body.documentId, req.body.newPrice)
          .then(document => {
            User.getEntityWithUser(document)
              .then(mappedDocument => {
                return res.json({
                  document: mappedDocument
                });
              })
              .catch(err => {
                return res.status(500).send({
                  message: "Could not edit document"
                });
              });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Could not edit document"
            });
          });
      }
    }
  );

  // serve documents image by imageId
  router.get("/image/:imageId", function(req, res) {
    Document.getImage(req.params.imageId, res);
  });

  return router;
};
