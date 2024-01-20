const garagesModel = require('../model/garagesModel');


exports.getGarages = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.query.latitude_min == null || req.query.latitude_max == null || req.query.longitude_min == null || req.query.longitude_max == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await garagesModel.find({
            latitude: {$gte: req.query.latitude_min, $lte: req.query.latitude_max},
            longitude: {$gte: req.query.longitude_min, $lte: req.query.longitude_max},
            visible: true
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getGaragesByOwner = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.owner == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await garagesModel.find({
            owner: req.params.owner,
            visible: true
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getGarageById = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params._id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await garagesModel.find({
            _id: req.params._id,
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.createGarage = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const garage = new garagesModel(req.body)
    try{
        res.json(await garage.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}

exports.deleteGarage = async(req, res)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    try{
        const out = await garagesModel.deleteOne({name: req.params.name, owner: req.params.email})
        res.json({})
    }catch (err){
        console.log(err)
        res.status(500).json({})
    }

}

exports.updateGarage = async(req, res)  => {
    res.header("Access-Control-Allow-Origin", "*");

    try{
        await garagesModel.updateOne(
            {"owner": req.params.email, "name": req.params.name},
            req.body
        )
        res.status(200).json(req.body);
    }catch (e) {
        res.json(e);
    }

}