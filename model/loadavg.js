var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoadavgSchema = new Schema({
  one: { type: Number},
  five: { type: Number},
  ten: { type: Number},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});
mongoose.model('Loadavg', LoadavgSchema);
