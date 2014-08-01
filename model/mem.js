var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MemSchema = new Schema({
  total: { type: Number},
  used: { type: Number},
  free: { type: Number},
  swapused: { type: Number},
  buffers: { type: Number},
  cached: { type: Number},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});
mongoose.model('Mem', MemSchema);
