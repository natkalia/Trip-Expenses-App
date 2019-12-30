const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

// User GET route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email trips');
    res.json(user)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
});

module.exports = router;