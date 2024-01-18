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

exports.updatePassword = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(req.body.password == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    try{
        await adminsModel.updateOne(
            {"email": req.params.email},
            {"password": req.body.password}
        )
        res.status(200).json("{}");
    }catch (e) {
        res.json(e);
    }
}