var exec = require('child_process').exec
var dao_cpu = require('../dao').Cpu
var dao_loadavg = require('../dao').Loadavg
var dao_mem = require('../dao').Mem

var os = require('os')
exports.cpu_info_save = function(){
    var top_c = "top -b -n 1 |grep   Cpu |awk '{print $2,$3,$5}'|sed  's/%[usi][syd],//g'"
    var  child = exec(top_c,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('stdout: ' + stdout);
            var array = stdout.split(' ')
            var us =  array[0]
            var sys =  array[1]
            var idle = array[2]
            console.log('us: ' + us," sys:"+sys," idle:"+idle);
            dao_cpu.newAndSave(us,sys,idle)
        });
};

exports.loadavg_info_save = function(){
    var loadavg = os.loadavg()
    var one = loadavg[0]
    var five = loadavg[1]
    var ten = loadavg[2]
    dao_loadavg.newAndSave(one,five,ten)
};

exports.mem_info_save = function(){
   var total_mem = os.totalmem()/(1024*1024)
    var free_mem = os.freemem()/(1024*1024)
    dao_mem.newAndSave(total_mem,free_mem)
};
