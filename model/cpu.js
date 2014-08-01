var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CpuSchema = new Schema({
  user: { type: Number},
  sys: { type: Number},
  idle: { type: Number},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});
mongoose.model('Cpu', CpuSchema);
