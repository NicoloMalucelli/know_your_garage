const express = require('express');
const {getUser, createUser, updatePassword} = require("../controller/usersController");
const router = express.Router();

router.route('/users').put((req, res) => {
    createUser(req, res)
})
router.route('/users/:email').get((req, res) => {
    getUser(req, res)
})

router.route('/users/:email').patch((req, res) => {
    updatePassword(req, res)
})

module.exports = router;