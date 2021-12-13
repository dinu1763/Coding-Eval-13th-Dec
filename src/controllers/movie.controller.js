const express = require('express');
const router = express.Router();


const Movie = require('../models/movie.model');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');
const path = require('path');

router.get('/',authenticate,async(req, res)=>{
    try {
        const tokenUser = req.user;
        const movies = await Movie.find({}).lean().exec();
        return res.send(movies)
    }catch(e){
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

router.post('/',authenticate, upload.single('poster_url'), async(req, res) =>{
    try{
        
        const tokenUser = req.user;
        const movie = await Movie.create({
            name:req.body.name,
            actors:req.body.actors,
            languages:req.body.languages,
            directors:req.body.directors,
            poster_url:req.file.path,
            user:tokenUser.user._id,

        });
        return res.status(201).json({movie});
    } catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

module.exports = router;