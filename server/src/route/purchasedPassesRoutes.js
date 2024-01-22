const express = require('express');
const {buyPass, buy} = require("../controller/purchasedPassesController");
const router = express.Router();

router.route('/buy').put((req, res) => {
    buy(req, res)
})

module.exports = router;