const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');
const { supportedCurrencies } = require('../models/trip');

// Currencies list routing
// Get supported currencies list
router.get('/list', (req, res) => {
  const currencies = supportedCurrencies;
  console.log(currencies);
  return res.status(200).json({
    "message": "Supported currencies got correctly",
    "currencies": currencies
  })
});

module.exports = router;