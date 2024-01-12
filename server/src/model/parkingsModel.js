const mongoose = require('mongoose')

const parkingsSchema = new mongoose.Schema({
    owner: String,
    name: String,
    latitude: Number,
    longitude: Number,
    slots: Number
});

module.exports = mongoose.model('parkings', parkingsSchema);