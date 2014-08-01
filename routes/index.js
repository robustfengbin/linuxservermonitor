var exec = require('child_process').exec

var dao_cpu = require('../dao').Cpu

module.exports = function (app) {
    app.get('/', function(req, res){
        res.render('index', { title: 'index' });
    });

    app.get('users', function(req, res){
        res.render('user', { title: 'user' });
    });


    app.get('/qcap', function(req, res){
         dao_cpu.findAll(function(cpus){
             console.info("cpus info:",cpus)
         })

        res.render('qcap', { title: 'qcap' });
    }) ;

    app.post('/qcap', function(req, res){


        res.render('qcap', { title: 'qcap' });
    }) ;

}

function exe_q_performance(){
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

        });
}



