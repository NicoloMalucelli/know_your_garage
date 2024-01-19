const mongoose = require('mongoose')

const parkingsSchema = new mongoose.Schema({
    car_id: String,
    garage_id: String,
    start: { "type": Date, "default": Date.now },
    end: { "type": Date, "default": null }
});

module.exports = mongoose.model('parkings', parkingsSchema);