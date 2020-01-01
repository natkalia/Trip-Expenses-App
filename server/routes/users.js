const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { User, validateUserOnLogin } = require('../models/user');

// User GET route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email trips');
    res.json(user)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
});

// User login
router.post('/login', async (req, res) => {
  const { error } = validateUserOnLogin(req.body);
  if (error) return res.status(400).json(`${error.details[0].message}`);

  var user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json('Invalid email or password');

  try {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
  } catch (err) {
    res.status(400).json('Error: ' + error)
  }

  const token = user.generateAuthToken();
  return res.status(200).json({"token": token});
});

module.exports = router;