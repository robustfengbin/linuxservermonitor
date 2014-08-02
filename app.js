
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
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

if(os.platform=="linux"){
    setInterval(function(){
      //  console.info("linux monitor cpu_info_save:")
     //   linux.cpu_info_save()
        console.info("linux monitor mem_info_save:")
        linux.mem_info_save()
        console.info("linux monitor loadavg_info_save:")
        linux.loadavg_info_save()
    },3*60*1000)
}

