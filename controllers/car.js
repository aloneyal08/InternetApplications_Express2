const carService = require('../services/car');

const createCar = async (req, res) => {
    const newCar = await carService.createCar(req.body.name, req.body.model, req.body.importer, req.body.color, req.body.year, req.body.price);
    res.json(newCar);
}

const getCars = async (req, res) => {
    const cars = await carService.getCars();
    res.json(cars);
}

const getCar = async (req, res) => {
    const car = await carService.getCarByNameModel(req.params.name, req.params.model);
    if (!car) {
        return res.status(404).json({ errors: ['Car not found'] });
    }

    res.json(car);
}

const updateCar = async (req, res) => {
  if (!req.body.importer || !req.body.color || !req.body.year || !req.body.price) {
    res.status(400).json({
      message: "importer, color, year, price are required",
    });
  }

  const car = await carService.updateCar(req.params.name, req.params.model, req.body.importer, req.body.color, req.body.year, req.body.price);
  if (!car) {
    return res.status(404).json({ errors: ['Car not found'] });
  }

  res.json(car);
}

const deleteCar = async (req, res) => {
  const car = await carService.deleteCar(req.params.name, req.params.model);
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