const express = require('express');
const {getCars, deleteCar} = require("../controller/carsController");
const router = express.Router();

router.route('/cars/:owner').get((req, res) => {
    getCars(req, res)
})

router.route('/cars/:license_plate').delete((req, res) => {
    deleteCar(req, res)
})

module.exports = router;