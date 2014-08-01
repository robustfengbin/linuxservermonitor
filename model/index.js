var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.mongodb.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongodb.db, err.message);
    process.exit(1);
  }
});

// models
require('./cpu');
require('./loadavg')
require('./mem')


exports.Cpu = mongoose.model('Cpu');
exports.Loadavg = mongoose.model('Loadavg');
exports.Mem = mongoose.model('Mem');



