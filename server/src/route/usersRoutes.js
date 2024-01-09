const express = require('express');
const {getUser, createUser} = require("../controller/usersController");
const router = express.Router();

router.route('/users').put((req, res) => {
    console.log("put received")
    createUser(req, res)
})
router.route('/users/:email').get((req, res) => {
    getUser(req, res)
})

module.exports = router;