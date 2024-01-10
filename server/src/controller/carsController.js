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