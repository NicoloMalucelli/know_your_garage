const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    owner: String,
    model: String,
    license_plate: String,
    color: String,
    matriculation_year: Number,
    pic: String
})

module.exports = mongoose.model('cars', carSchema);