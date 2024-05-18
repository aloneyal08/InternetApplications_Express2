/*
  Names: Yaniv Eshcol, Alon Eyal
  Ids:   331940239     331574491 
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = new Schema({
  name : {
    type: String,
    required: true
  },
  model : {
    type: String,
    required: true
  },
  importer: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Car', Car);