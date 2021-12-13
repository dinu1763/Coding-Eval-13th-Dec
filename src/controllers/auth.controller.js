const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const newToken = (user) => {
    return jwt.sign({user}, 'secret');
}

const register = async(req, res) => {
    try{
        let user = await User.findOne({email: req.body.email}).lean().exec();
        if(user){
            return res.status(400).json({message: "User Exists!!"});
        }
        user = await User.create(req.body);
        const token = newToken(user);
        return res.status(201).json({user:user, token: token});
    }catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }
}

const login = async (req, res) =>{
    try{
        let {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).send({message: "Oops! Incorrect Email"});
        }
        const token = newToken(user);
        return res.json({user, token});
    }catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }
}

module.exports = { register, login};