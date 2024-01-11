const express = require('express');
const {getCars, deleteCar, createCar} = require("../controller/carsController");
const router = express.Router();

router.route('/cars/:owner').get((req, res) => {
    getCars(req, res)
})

router.route('/cars/:license_plate').delete((req, res) => {
    deleteCar(req, res)
})

router.route('/cars').put((req, res) => {
    createCar(req, res)
})

module.exports = router;