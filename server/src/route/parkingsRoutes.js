const express = require('express');
const {getParkingsByCar, getNumOfParkingsByCar, getParkingsByQueryParams, addParking, endParking} = require("../controller/ParkingsController");
const router = express.Router();

router.route('/parkings/total_number/:car_id').get((req, res) => {
    getNumOfParkingsByCar(req, res)
})
router.route('/parkings/:car_id').get((req, res) => {
    getParkingsByCar(req, res)
})

router.route('/parkings').get((req, res) => {
    getParkingsByQueryParams(req, res)
})

router.route('/parkings').put((req, res) => {
    addParking(req, res)
})

router.route('/endparking/:car_id').patch((req, res) => {
    endParking(req, res)
})

module.exports = router;