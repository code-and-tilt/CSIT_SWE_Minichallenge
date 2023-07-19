const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    city: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    hotelName: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)