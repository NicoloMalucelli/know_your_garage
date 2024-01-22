const express = require('express');
const {getParkingsByCar, getNumOfParkingsByCar} = require("../controller/ParkingsController");
const router = express.Router();

router.route('/parkings/total_number/:car_id').get((req, res) => {
    getNumOfParkingsByCar(req, res)
})
router.route('/parkings/:car_id').get((req, res) => {
    getParkingsByCar(req, res)
})

module.exports = router;