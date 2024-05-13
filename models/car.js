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
    type: Array,
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
});

module.exports = mongoose.model('Car', Car);