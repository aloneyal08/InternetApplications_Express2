const Car = require('../models/car');

const createCar = async (name, model, importer, color, year, price) => {
    const car = new Car({
        name : name,
        model : model,
        importer : importer,
        color : color,
        year : year,
        price : price
    });

    return await car.save();
}

const getCarByNameModel = async (name, model) => {
    return await Car.find({name: name, model: model});
}

const getCars = async () => {
    return await Car.find({});
}

const updateCar = async (name, model, importer, color, year, price) => {
    const car = await getCarByNameModel(name, model);
    if (!car)
        return null;

    car.importer = importer;
    car.color = color;
    car.year = year;
    car.price = price;
    await car.save();
    return car;
}

const deleteCar = async (name, model) => {
    const car = await getCarByNameModel(name, model);
    if (!car)
        return null;

    await car.remove();
    return car;
}

module.exports = {
    createCar,
    getCarByNameModel,
    getCars,
    updateCar,
    deleteCar
}