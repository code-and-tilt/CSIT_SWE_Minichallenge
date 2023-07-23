const express = require('express');
const hotelModel = require('../models/hotels');
const flightsModel = require('../models/flights');

const router = express.Router()

module.exports = router;

//hotel API
router.get('/hotel', async (req, res) => {
  try {
    const checkInDate = new Date(req.query.checkInDate);
    const checkOutDate = new Date(req.query.checkOutDate);
    const destination = req.query.destination;

    const destinationExist = await hotelModel.findOne({
      city: destination,
    });

    if(!destinationExist){
      return res.json([]);
    }

    const dateCursor = new Date(checkInDate);
    while (dateCursor <= checkOutDate) {
      const hotelAvailability = await hotelModel.findOne({
        city: destination,
        date: dateCursor,
      });

      if (!hotelAvailability) {
        return res.status(400).json({ message: "Hotel is not available on " + dateCursor.toISOString().slice(0, 10) });
      }

      dateCursor.setDate(dateCursor.getDate() + 1);
    }

    const result = await hotelModel.aggregate([
      {
        $match: {
          city: destination,
          date: {
            $gte: checkInDate,
            $lte: checkOutDate,
          },
        },
      },
      {
        $group: {
          _id: "$hotelName",
          totalPrice: { $sum: "$price" },
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

    const hotel = result[0];
    const response = [{
      City: destination,
      "Check In Date": checkInDate.toISOString().slice(0, 10),
      "Check Out Date": checkOutDate.toISOString().slice(0, 10),
      Hotel: hotel._id,
      Price: hotel.totalPrice,
    }];

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//flight API
router.get('/flight', async (req, res) => {
  try {
    const departureDate = new Date(req.query.departureDate);
    const returnDate = new Date(req.query.returnDate);
    const destination = req.query.destination;

    const destinationExist = await flightsModel.findOne({
      destcity: destination,
    });

    const destinationExist2 = await flightsModel.findOne({
      srccity: destination,
    });

    if(!destinationExist && !destinationExist2){
      return res.json([]);
    }
    
    const departureResult = await flightsModel.aggregate([
      {
        $match: {
          destcity: destination,
          srccity: "Singapore",
          date: departureDate,
        },
      },
      {
        $sort: {
          price: 1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const returnResult = await flightsModel.aggregate([
      {
        $match: {
          destcity: "Singapore",
          srccity: destination,
          date: returnDate,
        },
      },
      {
        $sort: {
          price: 1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const departureFlight = departureResult[0];
    const returnFlight = returnResult[0];

    const response = [{
      City: destination,
      "Departure Date": departureDate.toISOString().slice(0, 10),
      "Departure Airline": departureFlight.airlinename,
      "Departure Price": departureFlight.price,
      "Return Date": returnDate.toISOString().slice(0, 10),
      "Return Airline": returnFlight.airlinename,
      "Return Price": returnFlight.price,
    }];

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});