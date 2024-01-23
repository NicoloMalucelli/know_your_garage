const express = require('express');
const {buy, getPurchasedPasses, getNumOfPassesByCar} = require("../controller/purchasedPassesController");
const router = express.Router();

router.route('/buy').put((req, res) => {
    buy(req, res)
})

router.route('/purchasedpasses/:car_id').get((req, res) => {
    getPurchasedPasses(req, res)
})
router.route('/purchasedpasses/total_number/:car_id').get((req, res) => {
    getNumOfPassesByCar(req, res)
})

module.exports = router;