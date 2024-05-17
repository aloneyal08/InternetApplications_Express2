const express = require('express');
var router = express.Router();
const carController = require('../controllers/car');

router.route('/cars')
    .get(carController.getCars)
    .post(carController.createCar);

router.route('/car')
    .get(carController.getCar)
    .patch(carController.updateCar)
    .delete(carController.deleteCar);

module.exports = router;