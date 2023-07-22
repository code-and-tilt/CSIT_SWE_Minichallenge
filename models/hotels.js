const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    city: {
        type: String
    },
    date: {
        type: Date
    },
    hotelName: {
        type: String
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('hotel', hotelSchema)