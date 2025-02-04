// controllers/sensorController.js
const SensorData = require('../models/SensorData');

exports.getSensorDataOverTime = async (req, res) => {
  try {
    // Get sensor data ordered by creation date, limiting to the last 50 entries
    const sensorData = await SensorData.find()
      .sort({ createdAt: -1 })  // Sort by most recent
      .limit(50);  // Limit to the last 50 records for performance

    // Send the sensor data as a response
    res.json(sensorData);
  } catch (err) {
    console.error("Error fetching sensor data:", err);
    res.status(500).json({ message: "Error fetching sensor data." });
  }
};
