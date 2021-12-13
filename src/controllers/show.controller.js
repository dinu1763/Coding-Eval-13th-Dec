const express = require('express');
const router = express.Router();

const Show = require('../models/show.model');


router.get('/', async(req, res) =>{
    try{
        const shows = await Show.find().populate("movie", "screen").lean().exec();
        return res.send(shows);
    }catch(e){
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

module.exports = router;