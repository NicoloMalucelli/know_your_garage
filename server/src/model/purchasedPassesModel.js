const mongoose = require('mongoose')

const purchasedPassesSchema = new mongoose.Schema({
    pass_id: String,
    car_id: String,
    start: Date,
    end: Date,
});

module.exports = mongoose.model('purchasedPasses', purchasedPassesSchema);