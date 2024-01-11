const carsModel = require('../model/carsModel');

exports.getCars = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    carsModel.find({owner: req.params.owner}).then(result => {
        if(result) {
            res.json(result)
        }else{
            res.json({})
        }
    })
}

exports.deleteCar = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    await carsModel.deleteOne({license_plate: req.params.license_plate})
    res.json({})
}

exports.createCar = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const cars = new carsModel(req.body);
    try{
        res.json(await cars.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}