
require('dotenv').config();
const config = require('config');

const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const testAPIRouter = require("./routes/testAPI");

const app = express();

const connectionString = `mongodb+srv://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.address')}/${config.get('db.name')}?retryWrites=true&w=majority`;

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
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...')
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/testAPI', testAPIRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
