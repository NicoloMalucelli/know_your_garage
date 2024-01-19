const express = require('express');
const {getParkingsByCar} = require("../controller/ParkingsController");
const router = express.Router();

router.route('/parkings/:car_id').get((req, res) => {
    getParkingsByCar(req, res)
})

module.exports = router;