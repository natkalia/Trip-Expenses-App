const express = require('express');
const router = express.Router();
const { Trip, validateTrip } = require('../models/trip');

//Add trip
router.post('/add', (req, res) => {
  const { error } = validateTrip(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  } else {
    const trip = new Trip({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate
    });
    trip.save()
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

module.exports = router;