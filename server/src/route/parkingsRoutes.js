const express = require('express');
const {getParkings} = require("../controller/parkingsController");
const router = express.Router();

router.route('/parkings').get((req, res) => {
    getParkings(req, res)
})

module.exports = router;