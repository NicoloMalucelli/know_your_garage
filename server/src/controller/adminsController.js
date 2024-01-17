const adminsModel = require('../model/adminsModel');

exports.getAdmin = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    adminsModel.findOne({email: req.params.email}).then(result => {
        if(result){
            res.json(result)
        } else {
            res.status(500).json({ error: 'Wrong email or password'})
        }
    })
}

