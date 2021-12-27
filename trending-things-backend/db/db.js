var Mongoose = require('mongoose');

var state = {
    db: null,
    connection: null
};

exports.connect = function(url, done) {
    if (state.db) return done();
    state.connection = Mongoose.connect(url, function(err, db) {
        if (err) return done(err);
        state.db = db;
        done();
    });
}

exports.get = function() {
    return state.db;
}

exports.getConnection = function() {
    return state.connection;
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}
