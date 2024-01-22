const purchasedPassesModel = require('../model/purchasedPassesModel');

exports.buy = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    const purchasedPasses = new purchasedPassesModel(req.body)
    try{
        res.json(await purchasedPasses.save());
    }catch (e) {
        res.status(500).json({ error: 'Internal Server Error occurred'})
    }

}