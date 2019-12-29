const express = require('express');
const router = express.Router();
const { Trip, validateTrip } = require('../models/trip');


//Add trip
router.post('/add', (req, res) => {
  const { error } = validateTrip(req.body);
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    const trip = new Trip({
      name: req.body.name,
      mainCurrency: req.body.mainCurrency,
      budget: req.body.budget,
      description: req.body.description,
      startDate: req.body.startDate
    });
    trip.save()
      .then(() => res.json('Trip added!'))
      .catch((error => res.status(400).json('Error: ' + error)))  
  }
});


module.exports = router;