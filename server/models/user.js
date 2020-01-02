require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create schema
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Username is required'],
    minlength: [4, 'Username must be at least 4 characters long'],
    maxlength: [20, 'Username must be at most 20 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Not a valid email address'
    ],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: 500,
    trim: true
  },
  trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  }]
})

// Generate webtoken

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
  }, config.get('db.jwtPrivateKey'));
  return token;
}

// Compile schema to a model
const User = mongoose.model('User', userSchema);

// Function will return object with value key and error key (if there is an error)
function validateUser(user) {
  const userSchema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(20)
      .required(),
    email: Joi.string()
      .min(8)
      .max(200)
      .required()
      .email(),
    password: Joi.string()
    .min(8)
    .max(24)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&]).{8,1024}$/) // regex for number/lowercase/capital/special !@#$%^&
  });
  return userSchema.validate(user)
}

// User validation for authorization process
// Function will return object with value key and error key (if there is an error)
function validateUserOnLogin(user) {
  const userSchema = Joi.object({
    email: Joi.string()
      .min(8)
      .max(200)
      .required()
      .email(),
    password: Joi.string()
      .required()
  });
  return userSchema.validate(user)
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateUserOnLogin = validateUserOnLogin;
