var exec = require('child_process').exec
var dao_cpu = require('../dao').Cpu


var dao_loadavg = require('../dao').Loadavg
var dao_mem = require('../dao').Mem
var os = require('os')
exports.cpu_info_save = function(callback){
    var cpus = os.cpus()
    var cpu_detail_array = []
    for(var i=0;i<cpus.length;i++){
        var c_detail = {}
        var c = cpus[i]
        var name = c.model
        var speed = c.speed
        var times = c.times
        var user = times.user
        var sys = times.sys
        var idle = times.idle
        c_detail.name = name+"["+i+"]"
        c_detail.sys = sys
        c_detail.user = user
        c_detail.idle = idle
        cpu_detail_array.push(c_detail)
    }
    dao_cpu.newAndSave(cpus.length,null,null,null,cpu_detail_array,function(err,result){
        console.info("dao_cpu save,result",result)
        callback(result)
    })
};

exports.loadavg_info_save = function(callback){
    var loadavg = os.loadavg()
    var one = loadavg[0]
    var five = loadavg[1]
    var ten = loadavg[2]
    dao_loadavg.newAndSave(one,five,ten,function(error,result){
    //    console.info("dao_loadavg save,result",result)
        callback(result)
    })

};

exports.mem_info_save = function(callback){
   var total_mem = os.totalmem()/(1024*1024)
    var free_mem = os.freemem()/(1024*1024)
    dao_mem.newAndSave(total_mem,free_mem,null,null,null,null,function(error,result){
        callback(result)
    })
};
