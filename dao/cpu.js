var models = require('../model');
var Cpu = models.Cpu;
var CpuDetail = models.CpuDetail

exports.getCpuById = function (id, callback) {
    Cpu.findOne({_id: id}, callback);
};

exports.getCpusByIds = function (ids, callback) {
    Cpu.find({'_id': {'$in': ids}}, callback);
};

exports.newAndSave = function (num,user, sys,idle,cpu_detail,  callback) {
  var cpu = new Cpu();
    cpu.num = num
    cpu.user = user;
    cpu.sys = sys;
    cpu.idle = idle;
    cpu.model = cpu_detail
    cpu.save(function(error,data){
        callback(null,data)
    })
};

exports.find_by_date = function(gte,lt,callback){
    Cpu.find({'create_at':{'$gte':new Date(gte),'$lt':new Date(lt)}}, function (err, objs) {
        callback(null,objs)
    }).sort({ time : -1 });
}

exports.findAll = function(callback){
    Cpu.find({}, function (err, cpus) {
        callback(null,cpus)
    });
}

exports.del_all = function(gte,lt,callback){
    Cpu.remove({'create_at':{'$gte':new Date(gte),'$lt':new Date(lt)}}, function (err, cpus) {
        callback(null,cpus)
    });
}

