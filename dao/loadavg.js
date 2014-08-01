var models = require('../model');
var Loadavg = models.Loadavg;

exports.getLoadavgById = function (id, callback) {
    Loadavg.findOne({_id: id}, callback);
};

exports.getLoadavgsByIds = function (ids, callback) {
    Loadavg.find({'_id': {'$in': ids}}, callback);
};

exports.newAndSave = function (one, five,ten,  callback) {
  var loadavg = new Loadavg();
    loadavg.one = one;
    loadavg.five = five;
    loadavg.ten = ten;
    loadavg.save(callback);
};
exports.findAll = function(callback){
    Loadavg.find({}, function (err, loadavgs) {
        callback(null,loadavgs)
    });
}

