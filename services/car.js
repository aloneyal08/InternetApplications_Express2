/*
  Names: Yaniv Eshcol, Alon Eyal
  Ids:   331940239     331574491 
*/
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
    return await Car.find({_id: new ObjectId(_id)});
}

const getCars = async (key) => {
    const cars = (await Car.find({})).filter(car => {
        return car.name.toLowerCase().includes(key) || car.model.toLowerCase().includes(key) 
                || car.importer.toLowerCase().includes(key) || car.color.toLowerCase().includes(key)
                || car.year.toString().toLowerCase().includes(key) || car.price.toString().toLowerCase().includes(key);
    }).map(car => {
        var logo = "";
        car_companies.forEach(company => {

            if (car.name.toLowerCase().includes(company.name.toLowerCase())) {
                logo = company.image.source;
            }
        });
        return Object.assign({}, car._doc, {logo: logo});
    });
    return cars;
}

const updateCar = async (_id, name, model, importer, color, year, price, photo) => {
    await Car.findOneAndUpdate({_id: new ObjectId(_id)}, {
        $set: {
            name: name,
            model: model,
            importer: importer,
            color: color,
            year: year,
            price: price,
            photo: photo
        }
    }, {upsert: true});
    return {_id, name, model, importer, color, year, price, photo};
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