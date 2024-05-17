const Car = require('../models/car');
var ObjectId = require('mongodb').ObjectId;

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

const getCarById = async (_id) => {
    console.log(_id);
    return await Car.find({_id: new ObjectId(_id)});
}

const getCars = async () => {
    return await Car.find({});
}

const updateCar = async (_id, name, model, importer, color, year, price) => {
    const car = await getCarById(_id);
    if (!car)
        return null;
    car.name = name;
    car.model = model;
    car.importer = importer;
    car.color = color;
    car.year = year;
    car.price = price;
    await car.save();
    return car;
}

const deleteCar = async (_id) => {
    await Car.deleteOne({_id: new ObjectId(_id)});
}

module.exports = {
    createCar,
    getCarById,
    getCars,
    updateCar,
    deleteCar
}