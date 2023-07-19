const express = require('express');
const hotelModel = require('../models/hotels');

const router = express.Router()

module.exports = router;

//hotel Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await hotelModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})