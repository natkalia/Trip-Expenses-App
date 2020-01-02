const _ = require('lodash');
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();

const { User, validateUser} = require('../models/user');

// User GET route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email trips');
    res.json(user)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
});

// Register new user

router.post('/', async (req, res) => {
  const {
      error
  } = validateUser(req.body);

  if (error) {
    // console.log(error.details[0].message)
    return res.status(400).json({'error': error.details[0].message});
  }

  let user = await User.findOne({
      email: req.body.email
  });

  if (user) {
    // console.log('User already registered')
    return res.status(400).json('Error: ' + error);
  } 
  
  let newUser = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();
  res.json(_.pick(newUser, ['_id', 'name', 'email']));
});

module.exports = router;