const express = require('express');
const {getParkings, getParkingsByOwner, createParking, deleteParking} = require("../controller/parkingsController");
const router = express.Router();

router.route('/parkings').get((req, res) => {
    getParkings(req, res)
})

router.route('/parkings/:owner').get((req, res) => {
    getParkingsByOwner(req, res)
})

router.route('/parkings').put((req, res) => {
    createParking(req, res)
})

router.route('/parkings/:email/:name').delete((req, res) => {
    deleteParking(req, res)
})

module.exports = router;