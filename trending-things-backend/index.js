const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const io = require("socket.io");
const bodyParser = require("body-parser");
const _ = require("lodash");
const db = require("./db/db");
const fs = require("fs");
const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");

const logger = require("./logger/logger");

const DB_NAME = "trendingThings";

app.use(bodyParser.json());

const privateKey = fs.readFileSync("privatekey.pem");
const certificate = fs.readFileSync("certificate.pem");

//app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.connect(
  "mongodb://localhost:27017/" + DB_NAME,
  function(err) {
    if (err) {
      console.log("[CODE 0] DATABASE Connection Error");
      process.exit(1);
    } else {
      //var httpServer = http.Server(app);
      var httpsServer = https.createServer(
        {
          key: privateKey,
          cert: certificate
        },
        app
      );
      var socket = io(httpsServer);

      socket.on("connection", function(socket) {
        console.log("socket connection established");
      });

      autoIncrement.initialize(db.getConnection());
      var auth = require("./auth.js")();
      app.use(auth.initialize());
      app.use("/user", require("./controllers/user"));
      app.use("/initialData", require("./controllers/initialData"));
      app.use("/document", require("./controllers/document")(socket));
      app.use("/like", require("./controllers/like")(socket));
      app.use("/dislike", require("./controllers/dislike"));
      app.use("/follower", require("./controllers/follower")(socket));
      app.use("/location", require("./controllers/location"));
      app.use("/question", require("./controllers/question"));
      app.use(
        "/questionComment",
        require("./controllers/questionComment")(socket)
      );
      app.use("/comment", require("./controllers/comment")(socket));
      app.use("/review", require("./controllers/review")(socket));
      app.use("/image", require("./controllers/image"));
      app.use("/filter", require("./controllers/filter"));
      app.use("/scan", require("./controllers/scan"));
      app.use("/notification", require("./controllers/notification"));
      app.use("/chat", require("./controllers/chat")(socket));
      app.use("/tag", require("./controllers/tag"));

      httpsServer.listen(8443, function() {
        process.title = process.argv[2];
        console.log("listening https on port 8443");

        // ALL errors are pointed to .log files
        // pipe in logger calls
        console.log = (...args) => logger.info.call(logger, ...args);
        console.info = (...args) => logger.info.call(logger, ...args);
        console.warn = (...args) => logger.warn.call(logger, ...args);
        console.error = (...args) => logger.error.call(logger, ...args);
        console.debug = (...args) => logger.debug.call(logger, ...args);
      });
    }
  }
);
