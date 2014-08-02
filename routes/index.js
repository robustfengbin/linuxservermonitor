var exec = require('child_process').exec

var dao = require('../dao')
var buildline = require('../service/buildline')
var moment = require('moment')

module.exports = function (app) {
    app.get('/', function(req, res){
        res.render('index', { title: 'index' });
    });

    app.get('/users', function(req, res){
        res.render('user', { title: 'user' });
    });

    app.get('/plot', function(req, res){
        res.render('plot', { title: 'user' });
    });

    app.get('/chart', function(req, res){
        res.render('chart', { title: 'chart' });
    });

    app.get('/line', function(req, res){
        res.render('line', { title: 'line' });
    });
    app.get('/load', function(req, res){
        buildline.build_load_line(function(result){
            console.info("result:",result)
         //   res.json(result)
            res.render('load', { result: JSON.stringify(result)});
        })

    });
    app.get('/q_load', function(req, res){
        buildline.build_load_line(function(result){
        console.info("result:",result)
            res.render('q_load', { result: JSON.stringify(result)});
        })



    });

    app.get('/callback', function(req, res){


            res.render('callback');


    });



    app.get('/qcap', function(req, res){
//        dao.Cpu.findAll(function(error,cpus){
//             console.info("cpus info:",cpus)
//         })
//        dao.Mem.findAll(function(error,mems){
//            console.info("mems info:",mems)
//        })
//        dao.Loadavg.findAll(function(error,loadavgs){
//            console.info("loadavgs info:",loadavgs)
//        })

        dao.Loadavg.find_by_date('2014-8-2','2014-8-3',function(error,loadavgs){
          //  console.info("loadavgs date info:",loadavgs)


        })


        res.render('qcap', { title: 'qcap' });
    }) ;

    app.post('/qcap', function(req, res){

        exe_q_performance()
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
            dao.Cpu.newAndSave(us,sys,idle)


        });
}



