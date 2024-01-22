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
            garage: req.params.garage,
            visible: req.query.visible
        });

        res.json(result)
    }catch (error){
        res.status(500).json("{error: Internal server error}")
    }
}

exports.deletePass = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    await passesModel.deleteOne({_id: req.params.id})
    res.json({})
}

exports.updatePass = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        await passesModel.updateOne(
            {"_id": req.params.id},
            req.body
        )
        res.status(200).json("{}");
    } catch (e) {
        res.json(e);
    }
}

exports.createPass = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    if(req.body.cost == null || req.body.duration == null || req.body.title == null || req.body.owner == null || req.body.garage == null){
        res.status(400).json({error: 'inclomplete request'})
        return
    }

    const pass = new passesModel(req.body);
    try{
        res.json(await pass.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }
}