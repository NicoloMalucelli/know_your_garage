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