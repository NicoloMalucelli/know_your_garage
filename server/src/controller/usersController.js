const usersModel = require('../model/usersModel');

exports.getUser = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    usersModel.findOne({email: req.params.email}).then(result => {
       if(result){
            res.json({'email' : result.email, 'username' : result.username, 'password' : result.password})
        } else {
           res.status(500).json({ error: 'Wrong email or password'})
        }
    })
}

exports.createUser = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    if(req.body.email == null || req.body.username == null || req.body.password == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    const userExists = await usersModel.exists({email: req.body.email})
    if(userExists){
        res.status(409).json({ error: 'email already in use' })
        return
    }

    const offer = new usersModel(req.body);
    try{
        res.json(await offer.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}