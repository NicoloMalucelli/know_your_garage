const usersModel = require('../model/usersModel');

exports.getUser = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    usersModel.findOne({email: req.params.email}).then(result => {
       if(result){
            res.json({'email' : result.email, 'username' : result.username, 'password' : result.password})
        } else {
            res.json({})
        }
    })
}