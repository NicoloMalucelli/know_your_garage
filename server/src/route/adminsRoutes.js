const express = require('express');
const {getAdmin, updatePassword} = require("../controller/adminsController");
const router = express.Router();

router.route('/admins/:email').get((req, res) => {
    getAdmin(req, res)
})

router.route('/admins/:email').patch((req, res) => {
    updatePassword(req, res)
})

module.exports = router;