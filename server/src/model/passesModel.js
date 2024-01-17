const mongoose = require('mongoose')

const passesSchema = new mongoose.Schema({
    owner: String,
    garage: String,
    duration: Number,
    cost: Number,
    title: String,
});

module.exports = mongoose.model('passes', passesSchema);