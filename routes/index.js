var exec = require('child_process').exec
var os = require('os')

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

    app.get('/cpu', function(req, res){
        var dse = date_start_date_end()

        var cpus = os.cpus()

        for(var i=0;i<cpus.length;i++){
            console.info("cpu["+i+"]---------")
            var c = cpus[i]
            var name = c.model
            console.info("cpu name:",name)
            var speed = c.speed
            console.info("cpu speed:",speed)
            var times = c.times
            var user = times.user
            var sys = times.sys
            var idle = times.idle

            console.info("cpu usage user:",user,"sys:",sys,"idle:",idle)
        }

        console.info("cpus:",cpus)


             res.render('cpu', { result: JSON.stringify(result)});


    });

    app.get('/mem', function(req, res){
        var dse = date_start_date_end()
        buildline.build_mem_line(dse[0],dse[1],function(result){
            res.render('mem', { result: JSON.stringify(result)});
        })

    });
    app.get('/q_mem', function(req, res){
        var dse = date_start_date_end()
        buildline.build_mem_line(dse[0],dse[1],function(result){
            res.render('q_mem', { result: JSON.stringify(result)});
        })

    });

    app.get('/load', function(req, res){
        var dse = date_start_date_end()
        buildline.build_load_line(dse[0],dse[1],function(result){
           res.render('load', { result: JSON.stringify(result)});
        })

    });
    //动态显示系统loadavg
    app.get('/q_load', function(req, res){
        var dse = date_start_date_end()
        buildline.build_load_line(dse[0],dse[1],function(result){
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

function date_start_date_end(){
    var now = moment()
    var date_start = now.format('YYYY-MM-DD')
    var next_day = moment().add(1, 'day');
    var date_end = next_day.format('YYYY-MM-DD')
    return [date_start,date_end]
}



