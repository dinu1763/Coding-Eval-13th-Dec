const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async(req, res) =>{
    try{
        const users = await User.find().lean().exec();
        return res.send(users);
    }catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

router.post('/', async (req, res) =>{
    try{
        const user = await User.create(req.body);
        return res.send(user);

    }catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }
});

module.exports = router;