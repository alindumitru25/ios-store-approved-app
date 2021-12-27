var autoIncrementInstance = null;

exports.set = function(obj) {
    autoIncrementInstance = obj;
}

exports.get = function() {
    return autoIncrementInstance;
}
