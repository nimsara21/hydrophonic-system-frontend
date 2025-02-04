const mongoose = require('mongoose');

const SystemControlSchema = new mongoose.Schema({
  waterPump: Boolean,
  pHUpMotor: Boolean,
  pHDownMotor: Boolean,
  growLight: Boolean,
  fertilizer: Boolean,
  solenoid: Boolean,
});

module.exports = mongoose.model('SystemControl', SystemControlSchema);
