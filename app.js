const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cars = require('./routes/car');

mongoose.connect('mongodb://0.0.0.0:27017/local',
    { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use('/', cars);

mongoose.connection.once('open', () => {
  app.listen(88);
  console.log('Server started');
});