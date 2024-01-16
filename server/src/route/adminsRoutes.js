const express = require('express');
const {getAdmin} = require("../controller/adminsController");
const router = express.Router();

router.route('/admins/:email').get((req, res) => {
    getAdmin(req, res)
})

module.exports = router;