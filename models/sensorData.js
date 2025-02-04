const mongoose = require('mongoose');

// Define the schema for the sensor data
const SensorDataSchema = new mongoose.Schema(
  {
    pH: { type: Number, required: true },
    waterLevel: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    waterTemp: { type: Number, required: true },
    growLightCycle: { type: Number, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the model
const SensorData = mongoose.model('SensorData', SensorDataSchema);
module.exports = SensorData;
