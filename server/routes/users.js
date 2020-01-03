const _ = require('lodash');
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User, validateUser, validateUserOnLogin } = require('../models/user');

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
  return res.header('x-auth-token', token).send();
});

// Register new user

router.post('/', async (req, res) => {
  const {
      error
  } = validateUser(req.body);

  if (error) {
    return res.status(400).json({'error': error.details[0].message});
  }

  let user = await User.findOne({
      email: req.body.email
  });

  if (user) {
    return res.status(400).json('Error: User already registered');
  } 
  
  let newUser = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();
  res.json(_.pick(newUser, ['_id', 'name', 'email']));
});

module.exports = router;
