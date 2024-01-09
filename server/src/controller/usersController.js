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

exports.createUser = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const userExists = await usersModel.exists({email: req.body.email})
    if(userExists){
        res.status(409).json({ error: 'email already in use' })
    }

    console.log("create user request received")
    const newUser = {'mail': req.body.email, 'username': req.body.username, 'password': req.body.password}

    const offer = new usersModel(req.body);
    try{
        res.json(await offer.save());
    }catch (e) {
        res.json(e);
    }

    //res.status(200).send()
}
 /*
    ;
    const userExists = await usersModel.exists({email: req.params.email})
    if(userExists){
        return res.status(409).json({ error: 'email already in use' })
    }

    usersModel.push({req.params.email, req.params.username, req.params.password})
    usersModel.save()
}
*/