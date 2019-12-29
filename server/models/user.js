const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be at most 20 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
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
})

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;