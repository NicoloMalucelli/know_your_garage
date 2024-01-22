const parkingsModel = require('../model/parkingsModel');


exports.getParkingsByCar = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.car_id == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    const page = 2
    const numOfResults = 2

    try {
        const result = await parkingsModel.find({
            car_id: req.params.car_id,
        }).sort({"start": -1}).skip(page*numOfResults).limit(numOfResults);
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}
