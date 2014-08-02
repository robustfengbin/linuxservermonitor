var util = require("util");
var events = require("events");


function MonitorEvent(){
    events.EventEmitter.call(this);
}
util.inherits(MonitorEvent, events.EventEmitter);

MonitorEvent.prototype.persistent_load = function(label,data) {
    console.info("emit--notify_per_load!!!!!!",data)
    this.emit("notify_per_load",data);//触发DATA事件

    return this;//返回对象，方便链式调用
}
exports = module.exports = MonitorEvent;
