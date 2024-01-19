const express = require('express');
const {getGarages, getGaragesByOwner, getGarageById, createGarage, deleteGarage, updateGarage} = require("../controller/garagesController");
const router = express.Router();

router.route('/garages').get((req, res) => {
    getGarages(req, res)
})

router.route('/garages/:owner').get((req, res) => {
    getGaragesByOwner(req, res)
})

router.route('/garages/id/:_id').get((req, res) => {
    getGarageById(req, res)
})

router.route('/garages').put((req, res) => {
    createGarage(req, res)
})

router.route('/garages/:email/:name').delete((req, res) => {
    deleteGarage(req, res)
})

router.route('/garages/:email/:name').patch((req, res) => {
    updateGarage(req, res)
})


module.exports = router;