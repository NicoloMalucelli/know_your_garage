const express = require('express');
const {getCars} = require("../controller/carsController");
const router = express.Router();

router.route('/cars/:owner').get((req, res) => {
    getCars(req, res)
})

module.exports = router;