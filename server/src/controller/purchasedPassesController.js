const purchasedPassesModel = require('../model/purchasedPassesModel');

exports.buy = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const purchasedPasses = new purchasedPassesModel(req.body)
    try{
        res.json(await purchasedPasses.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}

exports.getPurchasedPasses = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.car_id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await purchasedPassesModel
            .find({car_id: req.params.car_id})
            .sort({"end": -1, "_id": -1})
            .skip(req.query.skip * req.query.page)
            .limit(req.query.skip);
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getSoldPasses = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("req")

    if(req.params.pass_id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await purchasedPassesModel
            .find({pass_id: req.params.pass_id})
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.getNumOfPassesByCar = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");


    if(req.params.car_id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await purchasedPassesModel.find({car_id: req.params.car_id}).count();
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}