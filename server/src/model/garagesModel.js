const mongoose = require('mongoose')

const garagesSchema = new mongoose.Schema({
    owner: String,
    name: String,
    latitude: Number,
    longitude: Number,
    slots: Number,
    visible: { "type": Boolean, "default": true }
});

module.exports = mongoose.model('garages', garagesSchema);