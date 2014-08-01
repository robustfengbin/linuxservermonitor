exports.service={
	isProxy:false //是否启用代理
	,isAnew:true //进程死亡时是否新建
	,anewTime:5000 //新建的间隔
	,workerTatol:2 //进程总数，如为空默认取cpu总数
};
//socket
exports.socket={
	port:8040,
	logLevel:3
};

//redis
exports.redis={
	host:'192.168.1.95',
	port:6379,
	socketDB:9,
	debug_mode:false
};
//mongodb
exports.mongodb={
    host:'192.168.1.95',
    port:27017,
    db_name: 'capmonitor',
    session_secret: 'node_capmonitor',
    db: 'mongodb://192.168.1.95/capmonitor'
};
//socket.ioconf
exports.socketinfo={
    hostport:"http://192.168.0.219:3000"
}



