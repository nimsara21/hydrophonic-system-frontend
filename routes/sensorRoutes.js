const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData'); // Ensure this is the correct path

// POST route to save sensor data
router.post('/', async (req, res) => {
  try {
    // Create a new sensor data instance with data sent from the frontend
    const newSensorData = new SensorData(req.body);

    // Save to MongoDB
    await newSensorData.save();

    // Return the saved data with a 201 status code (created)
    res.status(201).json(newSensorData);  
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(400).json({ error: "Failed to save sensor data" }); // Bad Request if something goes wrong
  }
});

// GET route to fetch sensor data over time
router.get('/over-time', async (req, res) => {
  try {
    // Fetch the latest 50 sensor data records sorted by creation time
    const data = await SensorData.find().sort({ createdAt: -1 }).limit(50);
    res.json(data); // Return the data as a JSON response
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).send('Server Error'); // Send a 500 server error if something goes wrong
  }
});

module.exports = router;
