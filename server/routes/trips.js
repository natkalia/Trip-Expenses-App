const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');
const { Trip, validateTrip, validateExpense } = require('../models/trip');
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
        // For test trips route:
        // UPDATE
        await User.findByIdAndUpdate('5e13ab8334627a0e9b4ec33e', {$push: {trips: trip._id}});

      })
      .then(() => res.json('Trip added!'))
      .catch((error => res.status(400).json('Error: ' + error)))  
  }
});

// GET trip
router.get('/:id', async (req, res) => {
   try {
    const trip = await Trip.findById(req.params.id);
    res.json(trip)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
});

// Delete trip
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.body.userId;
    const tripId = req.params.id;
    const userObject = await User.findOne({"_id": userId});
    if (!userObject) return res.status(404).json({"message": "User not found"});
    await userObject.trips.remove(tripId);
    await userObject.save();
    Trip.findByIdAndRemove(tripId)
      .then((result) => 
        {
          if (!result) return res.status(404).json({"message": "The trip with the given ID was not found"})
          return res.json({"message": "Trip was sucessfully deleted."})
        })
      .catch((error) => res.status(404).send('Something goes wrong', error));
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
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
          isTripFinished: req.body.isTripFinished,
          budget: req.body.budget,
          mainCurrency: req.body.mainCurrency
        });
        trip.save()
          .then(() => res.json('Trip modified!'))
          .catch(error => res.status(400).json(error))
      })
      .catch(() => res.status(404).send('The trip with the given ID was not found'))
  }
});

// Expense routing
// Add expense to the trip
// - :id - trip id
router.post('/:id/expenses', async (req, res) => {
  try {
    const tripFromDatabase = await Trip.findById(req.params.id);
    const { categories : tripCategories }  = tripFromDatabase;
    const { error, value } = validateExpense(req.body, tripCategories);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    tripFromDatabase.expenses.push(value);
    const changedTrip = await tripFromDatabase.save();
    return res.status(200).send(changedTrip);
  } catch (error) {
    dbDebug('Sth wrong in posting new expense:');
    dbDebug(error);
    return res.status(400).send(error);
  }
});

// Display all expenses in the trip
// - :id - trip id
router.get('/:id/expenses', async (req, res) => {
  try {
    const tripFromDatabase = await Trip.findById(req.params.id);
    const expenses = tripFromDatabase.expenses;
    const expensesObject = {
      "expenses": expenses,
    }
    res.status(200).json(expensesObject);
  } catch (error) {
    dbDebug('Sth wrong during getting all expenses:');
    dbDebug(error);
    return res.status(400).send(error);
  }
});

// Display chosen expense
// - tripId - id of the trip
// - expenseId - id of the expense
router.get('/:tripId/expenses/:expenseId', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (trip === null) {
      return res.status(404).json({
        "message": "Trip not found"
      })
    }
    const expense = trip.expenses.id(req.params.expenseId);
    console.log('Expense', expense);
    if (expense === null) {
      return res.status(404).json({
        "message": "Expense not found"
      })
    }
    const expenseObject = {
      "expense": expense,
    }
    res.status(200).json(expenseObject);
  } catch (error) {
    dbDebug('Sth wrong during getting chosen expense:');
    dbDebug(error);
    return res.status(400).send(error);
  }
});

// Modify chosen expense
// - tripId: id of the trip
// - expenseId: id of the expense
router.put('/:tripId/expenses/:expenseId', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (trip === null) {
      return res.status(404).json({
        "message": "Trip not found"
      })
    }
    const { categories : tripCategories}  = trip;
    const { error, value } = validateExpense(req.body, tripCategories);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const edited = await Trip.updateOne({
      _id: req.params.tripId,
      "expenses._id": req.params.expenseId
    },
    {
      "$set": {
        "expenses.$.cost": value.cost,
        "expenses.$.name": value.name,
        "expenses.$.category": value.category,
        "expenses.$.currency": value.currency
      }
    });
    if (edited.n === 0) {
      return res.status(404).json({
        "message": "Expense not found",
      })
    }
    await trip.save();
    const changedTrip = await Trip.findById(req.params.tripId);
    const changedExpense = changedTrip.expenses.id(req.params.expenseId);
    res.status(200).json({
      "message": "Expense edited correctly",
      "data": changedExpense
    });
  } catch (error) {
    console.dir(error);
    return res.status(400).send(error);
  }
});

// Delete chosen expense
// - tripId: id of the trip
// - expenseId: id of the expense
router.delete('/:tripId/expenses/:expenseId', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (trip === null) {
      return res.status(404).json({
        "message": "Trip not found"
      })
    }
    const deletedExpense = trip.expenses.id(req.params.expenseId).remove();
    console.log(deletedExpense);
    await trip.save();
    return res.status(200).send(
      {
        "message": "I deleted expense",
        "data": deletedExpense
      });

  } catch (error) {
    const errorMessage = error.toString();
    dbDebug(errorMessage);
    return res.status(404).json({
      "message": errorMessage
    });
  }
});

module.exports = router;