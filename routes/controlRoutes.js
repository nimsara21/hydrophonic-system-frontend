const express = require('express');
const SystemControl = require('../models/SystemControl');

const router = express.Router();

// Get control state
router.get('/', async (req, res) => {
  try {
    const state = await SystemControl.findOne();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update control state
router.patch('/', async (req, res) => {
  try {
    const updatedState = await SystemControl.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedState);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
