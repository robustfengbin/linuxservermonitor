var util = require("util");
var events = require("events");


function MonitorEvent(){
    events.EventEmitter.call(this);
}
util.inherits(MonitorEvent, events.EventEmitter);

MonitorEvent.prototype.persistent_load = function(label,data) {
    console.info("notify_per_load-----------------------")

    this.emit("notify_per_load",data);//触发持久化loadavg

    return this;//返回对象，方便链式调用
}

MonitorEvent.prototype.persistent_mem = function(label,data) {

    console.info("notify_per_mem-----------------------")
    this.emit("notify_per_mem",data);//触发持久化mem

    return this;//返回对象，方便链式调用
}


exports = module.exports = MonitorEvent;
