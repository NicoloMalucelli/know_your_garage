const parkingsModel = require('../model/parkingsModel');


exports.getParkings = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.query.latitude_min == null || req.query.latitude_max == null || req.query.longitude_min == null || req.query.longitude_max == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await parkingsModel.find({
            latitude: {$gte: req.query.latitude_min, $lte: req.query.latitude_max},
            longitude: {$gte: req.query.longitude_min, $lte: req.query.longitude_max}
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getParkingsByOwner = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.owner == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await parkingsModel.find({
            owner: req.params.owner,
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.createParking = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const garage = new parkingsModel(req.body)
    try{
        res.json(await garage.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}

exports.deleteParking = async(req, res)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    console.log(req.params)
    await parkingsModel.deleteOne({name: req.params.name, owner: req.params.email})
    res.json({})
}