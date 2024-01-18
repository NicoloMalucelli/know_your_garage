const express = require('express');
const {getPasses, updatePass, createPass, deletePass} = require("../controller/passesController");
const router = express.Router();

router.route('/passes/:owner/:garage').get((req, res) => {
    getPasses(req, res)
})

router.route('/passes/:id').patch((req, res) => {
    updatePass(req, res)
})

router.route('/passes').put((req, res) => {
    createPass(req, res)
})

router.route('/passes/:id').delete((req, res) => {
    deletePass(req, res)
})

module.exports = router;