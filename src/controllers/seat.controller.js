const express = require('express');
const router = express.Router();

const Seat = require('../models/seat.model');


router.get('/', async(req, res) =>{
    try{
        const seats = await Seat.find().populate("screen").lean().exec();
        return res.send(seats);
    }catch(e){
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

module.exports = router;