/**
 * Created by apple on 14-8-2.
 */

var dao = require('../dao')
var moment = require('moment')
exports.build_load_line = function(date_start,date_end,callback){

    dao.Loadavg.find_by_date(date_start,date_end,function(error,loadavgs){
       var labels = []
       var one_load,five_load,ten_load;
       one_load = {
            label: "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data : []
        }
        five_load = {
            label: "My five dataset",
            fillColor : "rgba(151,187,205,0.2)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#ccc",
            pointHighlightFill : "#ccc",
            pointHighlightStroke : "rgba(151,187,205,1)",
            data : []
        }

        ten_load = {
            label: "My ten dataset",
            fillColor : "rgba(157,234,112,1)",
            strokeColor : "rgba(157,234,112,1)",
            pointColor : "rgba(157,234,112,1)",
            pointStrokeColor : "#aaa",
            pointHighlightFill : "#aaa",
            pointHighlightStroke : "rgba(157,234,112,1)",
            data : []
        }
        for(var i=0;i<loadavgs.length;i++){
         var ca = loadavgs[i].create_at
         var labeltext = moment(ca).format("HH:mm")
          labels.push(labeltext)
          var one_data = loadavgs[i].one
          one_load.data.push(one_data)
          var five_data = loadavgs[i].five
          five_load.data.push(five_data)
          var ten_data = loadavgs[i].ten
          ten_load.data.push(ten_data)
      }

        var lineChartData = {
            labels : labels,
            datasets : [
                one_load,
                five_load,
                ten_load
            ]
        }
        callback(lineChartData)

    })
};

exports.build_mem_line = function(date_start,date_end,callback){

    dao.Mem.find_by_date(date_start,date_end,function(error,datas){
        var labels = []
        var total,used
        total = {
            label: "My First dataset",
            fillColor : "rgba(220,220,220,0.2)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data : []
        }
        used = {
            label: "My five dataset",
            fillColor : "rgba(151,187,205,0.2)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#ccc",
            pointHighlightFill : "#ccc",
            pointHighlightStroke : "rgba(151,187,205,1)",
            data : []
        }


        for(var i=0;i<datas.length;i++){
            var ca = datas[i].create_at
            var labeltext = moment(ca).format("HH:mm")
            labels.push(labeltext)
            var total_data = datas[i].total
            total.data.push(total_data)
            var free_data = datas[i].free
            used.data.push(total_data-free_data)

        }

        var lineChartData = {
            labels : labels,
            datasets : [
                total,
                used
            ]
        }
        callback(lineChartData)

    })
};


exports.build_cpu_line = function(date_start,date_end,callback){

    dao.Cpu.find_by_date(date_start,date_end,function(error,datas){
        var labels = []
        var sys,user,idle
        sys = {
            label: "My sys dataset",
            fillColor : "rgba(220,220,220,0.2)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data : []
        }
        user = {
            label: "My user dataset",
            fillColor : "rgba(151,187,205,0.2)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#ccc",
            pointHighlightFill : "#ccc",
            pointHighlightStroke : "rgba(151,187,205,1)",
            data : []
        }
        idle = {
            label: "My idel dataset",
            fillColor : "rgba(157,234,112,1)",
            strokeColor : "rgba(157,234,112,1)",
            pointColor : "rgba(157,234,112,1)",
            pointStrokeColor : "#aaa",
            pointHighlightFill : "#aaa",
            pointHighlightStroke : "rgba(157,234,112,1)",
            data : []
        }

        for(var i=0;i<datas.length;i++){
            var ca = datas[i].create_at
            var labeltext = moment(ca).format("HH:mm")
            labels.push(labeltext)
            var sys_data = datas[i].sys
            sys.data.push(sys_data)
            var user_data = datas[i].user
            user.data.push(user_data)
            var idle_data = datas[i].idle
   //         idle.data.push(idle_data)
        }
        var lineChartData = {
            labels : labels,
            datasets : [
                sys,
                user
         //       idle
            ]
        }

        callback(lineChartData)
    })
}


