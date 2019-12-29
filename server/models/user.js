const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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
})

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

/*
// Test joi validation
const user1 = {
  name: 'Anna',
  email: 'sadd@sa.pl',
  password: '1aS@1234'
}
const result = validateUser(user1);
console.log(result);

// Test mongoose validation
const createUser = (userData) => {
  const user = new User(userData);
  console.log(user.validateSync());
} 
createUser(result.value);
*/

exports.User = User;
exports.validate = validateUser;