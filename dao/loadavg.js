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
    loadavg.save(function(error,data){
        callback(null,data)
    });
};
exports.findAll = function(callback){
    Loadavg.find({}, function (err, loadavgs) {
        callback(null,loadavgs)
    });
}

exports.find_by_date = function(gte,lt,callback){
    Loadavg.find({'create_at':{'$gte':new Date(gte),'$lt':new Date(lt)}}, function (err, loadavgs) {
        callback(null,loadavgs)
    }).sort({ time : -1 });
}

exports.del_all = function(gte,lt,callback){
    Loadavg.remove({'create_at':{'$gte':new Date(gte),'$lt':new Date(lt)}}, function (err, loadavgs) {
        callback(null,loadavgs)
    });
}

