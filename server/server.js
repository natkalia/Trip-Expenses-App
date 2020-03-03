
require('dotenv').config();
const config = require('config');

const serverDebug = require('debug')('server:startup');
const dbDebug = require('debug')('server:database');
const morgan = require('morgan');

const cors = require("cors");
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');
const currencyRouter = require('./routes/currencies');

const { checkAuthenticated } = require('./middleware/auth')

const app = express();

if (!process.env.JWT_PRIVATEKEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

const connectionString = 
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE_ADDRESS}/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

app.use(cors()); 
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  serverDebug('Morgan enabled...')
}

// App routes
app.use('/api/trips', checkAuthenticated, tripsRouter);
app.use('/api/users', usersRouter);
app.use('/api/currencies', currencyRouter);

// Development - serve static from public
app.use(express.static(path.join(__dirname, 'public')));

// Production - serve static from build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'));
  }); 
}

const port = process.env.PORT || 5000;
app.listen(port, () => serverDebug(`Listening on port ${port}...`));

module.exports = app;

