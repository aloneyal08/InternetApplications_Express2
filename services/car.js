const Car = require('../models/car');
var ObjectId = require('mongodb').ObjectId;
var car_companies = require('../car_companies.json');

const createCar = async (name, model, importer, color, year, price, photo) => {
    const car = new Car({
        name : name,
        model : model,
        importer : importer,
        color : color,
        year : year,
        price : price,
        photo : photo
    });

    return await car.save();
}

const getCarById = async (_id) => {
    console.log(_id);
    return await Car.find({_id: new ObjectId(_id)});
}

const getCars = async (key) => {
    const cars = (await Car.find({})).filter(car => {
        return car.name.toLowerCase().includes(key) || car.model.toLowerCase().includes(key) 
                || car.importer.toLowerCase().includes(key) || car.color.toLowerCase().includes(key)
                || car.year.toString().toLowerCase().includes(key) || car.price.toString().toLowerCase().includes(key);
    }).map(car => {
        var logo = "";
        car_companies.car_companies.forEach(company => {
            if (car.name.toLowerCase().includes(company.name.toLowerCase()) || company.name.toLowerCase().includes(car.name.toLowerCase())) {
                logo = company.logo;
            }
        });
        return Object.assign({}, car._doc, {logo: logo});
    });
    console.log(cars);
    return cars;
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