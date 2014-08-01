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
//require('./loadaverage')
//require('./mem')


exports.Cpu = mongoose.model('Cpu');
//exports.Loadaverage = mongoose.model('Loadaverage');
//exports.Mem = mongoose.model('Mem');



