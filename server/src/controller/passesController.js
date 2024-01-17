const passesModel = require('../model/passesModel');

exports.getPasses = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.params.owner == null || req.params.garage == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try {
        const result = await passesModel.find({
            owner: req.params.owner,
            garage: req.params.garage
        });
        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}