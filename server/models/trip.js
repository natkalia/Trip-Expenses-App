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
  'travel',
  'tickets',
  'accomodation',
  'health and insurance',
  'food',
  'other'
];

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
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
    default: moment.format(Date.now),
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
    name: Joi.string()
      .trim()
      .min(5)
      .max(30)
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
      .max(300)
      .items(Joi.object({
        name: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required(),
        category: Joi.string()
          .required()
          .valid(Joi.in('/categories')),
        cost: Joi.number()
          .min(0)
          .max(100000)
          .precision(2)
          .required(),
        currency: Joi.string()
          .default(Joi.ref('/mainCurrency'))
          .valid(...supportedCurrencies)
      })),
  });

  return tripSchema.validate(trip);
}

// Test trip object
/*
const trip1 = {
  name: 'Trip to Belgium',
  mainCurrency: 'EUR',
  budget: 500.2367,
  description: 'First trip in database. Meow!',
  startDate: '2020-10-01',
  expenses: [
    {
      name: 'Train ticket to Brussels',
      category: 'tickets',
      cost: 350,
      currency: 'PLN',
    },
    {
      name: 'Train ticket to Haga',
      category: 'accomodation',
      cost: 650,
    // currency: 'EUR'
    }
  ]
};
*/

// Test Joi Validation
/*
const validateResult = validateTrip(trip1);
console.log('Validate result object:');
console.dir(validateResult, {depth: null});
*/

// Test internal mongoose validation
/*
function createTrip(dataTrip) {
  let firstTrip = new Trip(dataTrip);
  console.log(firstTrip.validateSync());
 }

createTrip(validateResult.value);
*/

exports.Trip = Trip;
exports.validateTrip = validateTrip;