var models = require('../model');
var Mem = models.Mem;

exports.getMemById = function (id, callback) {
    Mem.findOne({_id: id}, callback);
};

exports.getMemsByIds = function (ids, callback) {
    Mem.find({'_id': {'$in': ids}}, callback);
};

exports.newAndSave = function (total, free,used,swapused,buffers,cached, callback) {
  var mem = new Mem();
    mem.total = total;
    mem.free = free;
    mem.used = used;
    mem.swapused = swapused;
    mem.buffers = buffers;
    mem.cached = cached;
    mem.save(callback);
};
exports.findAll = function(callback){
    Mem.find({}, function (err, mems) {
        callback(null,mems)
    });
}

