const express = require('express');
const hotelModel = require('../models/hotels');
const flightsModel = require('../models/flights');

const router = express.Router()

module.exports = router;

//hotel Get all Method
router.get('/getAllCity', async (req, res) => {
    try{
        // write a query to get all the cities, do not use find()
        const data = await hotelModel.find();
        res.json(data)
    }
        catch(error){
        res.status(500).json({message: error.message})
    }
})


//flight API
router.get('/flight', async (req, res) => {
    try {
        const departureDate = new Date(req.query.departureDate);
        const returnDate = new Date(req.query.returnDate);
        const destination = req.query.destination;
    
        const result = await flightsModel.aggregate([
          {
            $match: {
              destcity: destination,
              date: {
                $gte: departureDate,
                $lte: returnDate,
              },
            },
          },
          {
            $group: {
              _id: "$airlinename",
              totalPrice: { $sum: "$price"},
            },
          },
          {
            $sort: {
              totalPrice: 1,
            },
          },
          {
            $limit: 1,
          },
        ]);
    
        const flight = result[0];
        const response = {
          City: destination,
          "Departure Date": departureDate.toISOString().slice(0, 10),
          "Return Date": returnDate.toISOString().slice(0, 10),
          "Airline Name": flight._id,
          Price: flight.totalPrice,
        };
    
        res.json(response);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });