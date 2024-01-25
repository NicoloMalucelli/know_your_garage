const parkingsModel = require('../model/parkingsModel');
const index = require('../../src/index');

exports.getNumOfParkingsByCar = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if (req.params.car_id == null) {
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await parkingsModel.find({
            car_id: req.params.car_id,
        }).count();
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getParkingsByCar = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.car_id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await parkingsModel.find({
            car_id: req.params.car_id,
        }).sort({"start": -1}).skip(req.query.skip*req.query.page).limit(req.query.skip);
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getParkingsByQueryParams = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        const result = await parkingsModel.find(req.query);
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.addParking = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    req.body.start = new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Helsinki'}))
    const parking = new parkingsModel(req.body);
    try{
        const result = await parking.save()
        res.json(result);
        index.parkingChanged(result)
        index.freeSlotsChanged({id: result.garage_id})
    }catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}

exports.endParking = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        let toModify = await parkingsModel.find(
            {"car_id": req.params.car_id, "end": null}
        )
        if(toModify.length == 0){
            res.status(404).json({error: "no active parking"});
            return
        }

        const end = new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Helsinki'}))
        await parkingsModel.updateOne(
            {"car_id": req.params.car_id, "end": null},
            {"end": end}
        )
        const result = {
            'car_id': req.params.car_id,
            'end': end
        }
        res.status(200).json(result);
        index.parkingChanged(result)
        index.freeSlotsChanged({id: toModify[0].garage_id})
    } catch (e) {
        res.json(e);
    }
}

exports.getRealTimeParkings = async (garage_id) => {
    try {
        const result = await parkingsModel.find({
            garage_id: garage_id,
            end: null
        });
        return result
    }catch (error){
        return {}
    }
}