/*
  Names: Yaniv Eshcol, Alon Eyal
  Ids:   331940239     331574491 
*/
const express = require('express');
var router = express.Router();
const carController = require('../controllers/car');

router.route('/cars')
    .get(carController.getCars)
    .post(carController.createCar);

router.route('/car')
    .get(carController.getCar)
    .put(carController.updateCar)
    .delete(carController.deleteCar);

module.exports = router;