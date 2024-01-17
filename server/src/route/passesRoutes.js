const express = require('express');
const {getPasses} = require("../controller/passesController");
const router = express.Router();

router.route('/passes/:owner/:garage').get((req, res) => {
    getPasses(req, res)
})

module.exports = router;