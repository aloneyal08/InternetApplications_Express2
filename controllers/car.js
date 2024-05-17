const carService = require('../services/car');

const createCar = async (req, res) => {
  const newCar = await carService.createCar(req.body.name, req.body.model, req.body.importer, req.body.color, req.body.year, req.body.price, req.body.photo);
  res.json(newCar);
}

const getCars = async (req, res) => {
  const cars = await carService.getCars(req.query.key.toLowerCase());
  res.json(cars);
}

const getCar = async (req, res) => {
  const car = await carService.getCarById(req.query._id);
  if (!car[0]) {
      return res.status(404).json({ errors: ['Car not found'] });
  }

  res.json(car[0]);
}

const updateCar = async (req, res) => {
  console.log("Body: " + req.body);
  if (!req.body._id || !req.body.name || !req.body.model || !req.body.importer || !req.body.color || !req.body.year || !req.body.price || !req.body.photo) {
    res.status(400).json({
      message: "importer, color, year, price are required",
    });
  }

  const car = await carService.updateCar(req.body._id, req.body.name, req.body.model, req.body.importer, req.body.color, req.body.year, req.body.price, req.body.photo);
  if (!car) {
    return res.status(404).json({ errors: ['Car not found'] });
  }

  res.json(car);
}

const deleteCar = async (req, res) => {
  const car = await carService.deleteCar(req.body._id);
  if (!car) {
    return res.status(404).json({ errors: ['Car not found'] });
  }

  res.send();
}

module.exports = {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar
};