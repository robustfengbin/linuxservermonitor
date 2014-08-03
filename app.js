
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var linux = require('./service/linux')
var os = require('os')
var MonitorEvent = require('./service/monitorevent')
var socket_io = require('socket.io')
var buildline = require('./service/buildline')
var moment = require('moment')


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(app.router);
routes(app);
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var monitorEvent = new MonitorEvent()


var io = socket_io.listen(server);

io.sockets.on('connection', function (socket) {

    monitorEvent.on('notify_per_load',function(data){
        console.info("have notify_per_load",data)
       //广播loadavg信息已更新
        socket.broadcast.emit('load_info', data)

    })

    monitorEvent.on('notify_per_mem',function(data){
        console.info("have notify_per_mem",data)
        //广播mem信息已更新
        socket.broadcast.emit('mem_info', data)

    })
})

//if(os.platform=="linux"){
    setInterval(function(){
        console.info("linux monitor cpu_info_save:")
        linux.cpu_info_save(function(data){

        })
        console.info("linux monitor mem_info_save:")
        linux.mem_info_save(function(data){
            var ca = data.create_at
            var labeltext = moment(ca).format("HH:mm")
            var json = {array:[data.total,data.total-data.free],label:labeltext}
            monitorEvent.persistent_mem("persistent_mem",json)
            })
        console.info("linux monitor loadavg_info_save:")
        linux.loadavg_info_save(function(data){
            var ca = data.create_at
            var labeltext = moment(ca).format("HH:mm")
            var json = {array:[data.one,data.five,data.ten],label:labeltext}
            monitorEvent.persistent_load("persistent_load",json)
        })

    },1*60*1000)
//}

