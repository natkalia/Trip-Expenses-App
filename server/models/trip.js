const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const moment = require ('moment');

const supportedCurrencies = [
  'PLN',
  'USD',
  'GBP',
  'EUR',
  'JPY',
  'AUD',
  'CAD',
  'CHF'
];

const defaultCategories = [
  'accomodation',
  'food',
  'health and insurance',
  'other',
  'tickets',
  'travel',
];

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 40,
    trim: true,
    required: [true, 'You should define expense name']
  },
  category: {
    type: String,
    required: [true, 'You should define category'],
    minlength: 3,
    maxlength: 30,
  },
  cost: {
    type: Number,
    min: 0,
    max: 10000,
    required: [true, 'You should define the cost']
  },
  currency: {
    type: String,
    enum: supportedCurrencies,
    minlength: 3,
    maxlength: 3,
    default: 'PLN',
  }
});

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You should name your trip'],
    minlength: 5,
    maxlength: 100,
    trim: true
  },
  startDate: {
    type: Date,
    default: moment().format(),
    min: '2019-12-01',
    max: '2099-12-31'
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 200,
    trim: true
  },
  isTripFinished: {
    type: Boolean,
    default: false,
  },
  budget: {
    type: Number,
    default: 0,
    min: 0,
    max: 1000000
  },
  mainCurrency: {
    type: String,
    enum: supportedCurrencies,
    default: 'PLN'
  },
  categories: {
    type: [{
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true
    }],
  },
  expenses: [expenseSchema],
});

const Trip = mongoose.model('Trip', tripSchema);

function validateTrip(trip) {
  // validateTrip returns an object with:
  // - error key if there is an error with model
  // - value key with validated object and added default
  //   values if needed

  const tripSchema = Joi.object({
    _id: Joi.object(),
    __v: Joi.number(),
    name: Joi.string()
      .trim()
      .min(5)
      .max(100)
      .required(),
    startDate: Joi.date()
      // .default(Date.now)
      .default(new Date())
      .min('1-12-2019'),
    description: Joi.string()
      .trim()
      .min(10)
      .max(200),
    isTripFinished: Joi.boolean()
      .default('false'),
    budget: Joi.number()
      .default(0)
      .min(0)
      .max(1000000)
      .precision(2),
    mainCurrency: Joi.string()
      .default('PLN')
      .valid(...supportedCurrencies),
    categories: Joi.array()
      .default(defaultCategories)
      .max(20)
      .unique()
      .items(
        Joi.string()
          .trim()
          .min(3)
          .max(30)
      ),
    expenses: Joi.array()
  });

  return tripSchema.validate(trip);
}

function validateExpense(expenseObject, categoriesArray) {
  const expenseSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string()
      .trim()
      .min(3)
      .max(40)
      .required(),
    category: Joi.string()
      .required()
      .valid(...categoriesArray),
      // .valid(Joi.in('/categories')),
    cost: Joi.number()
      .min(0)
      .max(100000)
      .precision(2)
      .required(),
    currency: Joi.string()
      .valid(...supportedCurrencies)
      .required()
  });

  return expenseSchema.validate(expenseObject);
}

exports.Trip = Trip;
exports.validateTrip = validateTrip;
exports.validateExpense = validateExpense;
exports.supportedCurrencies = supportedCurrencies;