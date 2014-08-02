/**
 * Created by apple on 14-8-2.
 */

var dao = require('../dao')
var moment = require('moment')
exports.build_load_line = function(callback){

    dao.Loadavg.find_by_date('2014-8-2','2014-8-3',function(error,loadavgs){
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
