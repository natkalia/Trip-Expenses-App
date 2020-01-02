const express = require('express');
const router = express.Router();
const { Trip, validateTrip } = require('../models/trip');
const { User, validateUser} = require('../models/user');

//Add trip

// Currently the trip is added to same hardcoded user! To be changed after authentication is done!!

router.post('/add', (req, res) => {
  const { error, value } = validateTrip(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  } else {
    const trip = new Trip(value);
    trip.save()
      .then(async(trip) => {     
        // After authentication is done change the line below
        await User.findByIdAndUpdate('5e09e6344d3be0524e67993c', {$push: {trips: trip._id}});
      })
      .then(() => res.json('Trip added!'))
      .catch((error => res.status(400).json('Error: ' + error)))  
  }
});

// Delete trip
router.delete('/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(() => res.json("Trip was sucessfully deleted."))
    .catch(() => res.status(404).send('The trip with the given ID was not found'))
});

// edit trip information
router.put('/edit/:id', (req, res) => {
  const { error } = validateTrip(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  } else {
    Trip.findById(req.params.id)
      .then(trip => {
        trip.set({
          name: req.body.name,
          description: req.body.description,
          startDate: req.body.startDate,
          isTripFinished: req.body.isTripFinished
        });
        trip.save()
          .then(() => res.json('Trip modified!'))
          .catch(error => res.status(400).json(error))
      })
      .catch(() => res.status(404).send('The trip with the given ID was not found'))
  }
});

// Add expense
router.post('/:id/expenses/', validation, async (req, res) => {
  try {
    console.log('What from user:');
    console.dir(req.body);
    const tripFromDatabase = await Trip.findById(req.params.id);
    const plainObject = tripFromDatabase.toJSON();
    console.log('Trip from database:');
    console.dir(tripFromDatabase);
    console.log('Plain object');
    console.dir(plainObject);
    plainObject.expenses.push(req.body);
    console.log('Plain object after push');
    console.dir(plainObject)
    const { error } = validateTrip(plainObject);
    if (error) {
      console.log('Jakiś error');
      return res.status(400).send(error.details[0].message);
    }
    tripFromDatabase.expenses.push(req.body);
    console.log('Trip object after push');
    console.log(tripFromDatabase);
    const changedTrip = await tripFromDatabase.save();
    return res.status(200).json('Expense added');

  } catch (error) {
    console.dir(error);
    return res.status(400).send(error);
  }
});

// Display all expenses
router.get('/:id/expenses/', async (req, res) => {
  try {
    const tripFromDatabase = await Trip.findById(req.params.id);
    const expenses = tripFromDatabase.expenses;
    const expensesObject = {
      "expenses": expenses,
    }
    res.status(200).json(expensesObject);
  } catch (error) {
    console.dir(error);
    return res.status(400).send(error);
  }
});

// Display chosen expense

// Modify chosen expense

// Delete chosen expense



module.exports = router;