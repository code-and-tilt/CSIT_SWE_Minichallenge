const mongoose = require('mongoose');

const flightsSchema = new mongoose.Schema({
    airline: {
        required: true,
        type: String
    },
    airlineID: {
        required: true,
        type: Number
    },
    srcairport: {
        required: true,
        type: String
    },
    srcairportID: {
        required: true,
        type: Number
    },
    destairport: {
        required: true,
        type: String
    },
    destairportID: {
        required: true,
        type: Number
    },
    codeShare: {    
        required: true,
        type: String
    },
    stop: {
        required: true,
        type: Number
    },  
    equipment: {    
        required: true,
        type: String
    },
    airlineName: {
        required: true,
        type: String
    },
    srcAirportName: {
        required: true,
        type: String
    },
    srcCity: {
        required: true,
        type: String
    },
    srcCountry: {
        required: true,
        type: String
    },
    destAirportName: {
        required: true,
        type: String
    },
    destCity: {
        required: true,
        type: String
    },
    destCountry: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('flights', flightsSchema)