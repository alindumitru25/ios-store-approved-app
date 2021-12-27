var fs = require('fs');
var Mongoose = require('mongoose');
Mongoose.Promise = Promise;
var Grid = require('gridfs-stream');
var GridFs = Grid(Mongoose.connection.db, Mongoose.mongo);

exports.getImage = function(id, res, next) {
    try {
        var readStream = GridFs.createReadStream({_id: id});
        readStream.pipe(res);
    } catch(err) {
    }
}
