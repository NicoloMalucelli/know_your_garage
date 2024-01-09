const express = require('express');
const {getUser} = require("../controller/usersController");
const router = express.Router();

router.route('/users/:email').get((req, res) => {
    getUser(req, res)
})

module.exports = router;