const mongoose = require('mongoose');

const flightsSchema = new mongoose.Schema({
    _id : {
        required: true,
        type: Number
    },
    airline: {
        required: true,
        type: String
    },
    airlineid: {
        required: true,
        type: Number
    },
    srcairport: {
        required: true,
        type: String
    },
    srcairportid: {
        required: true,
        type: Number
    },
    destairport: {
        required: true,
        type: String
    },
    destairportid: {
        required: true,
        type: Number
    },
    codeshare: {    
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
    airlinename: {
        required: true,
        type: String
    },
    srcairportname: {
        required: true,
        type: String
    },
    srccity: {
        required: true,
        type: String
    },
    srccountry: {
        required: true,
        type: String
    },
    destairportname: {
        required: true,
        type: String
    },
    destcity: {
        required: true,
        type: String
    },
    destcountry: {
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