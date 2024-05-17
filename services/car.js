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

const getCarById = async (_id) => {
    return await Car.find({_id: _id});
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
    const car = await getCarById(_id);
    if (!car)
        return null;
    console.log(car);
    await car.remove();
    return car;
}

module.exports = {
    createCar,
    getCarById,
    getCars,
    updateCar,
    deleteCar
}