var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CpuDetailSchema = new Schema({
    user: { type: Number},
    sys: { type: Number},
    idle: { type: Number},
    name:{type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
var CpuSchema = new Schema({
  num:{type:Number},
  user: { type: Number},
  sys: { type: Number},
  idle: { type: Number},
  model:[CpuDetailSchema],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});
mongoose.model('Cpu', CpuSchema);
mongoose.model('CpuDetail', CpuDetailSchema);

