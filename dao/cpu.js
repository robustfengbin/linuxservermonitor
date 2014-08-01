var models = require('../model');
var Cpu = models.Cpu;

exports.getCpuById = function (id, callback) {
    Cpu.findOne({_id: id}, callback);
};

exports.getCpusByIds = function (ids, callback) {
    Cpu.find({'_id': {'$in': ids}}, callback);
};

exports.newAndSave = function (user, sys,idle,  callback) {
  var cpu = new Cpu();
    cpu.user = user;
    cpu.sys = sys;
    cpu.idle = idle;
    cpu.save(callback);
};
exports.findAll = function(callback){
    Cpu.find({}, function (err, cpus) {
        callback(null,cpus)
    });
}

