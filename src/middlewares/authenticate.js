const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return new Promise((resolve, reject) =>{
        jwt.verify(token, 'secret', function(err, token){
            if(err){
                return reject(err);
            }
            return resolve(token);
        })
    })
}

const authenticate = async(req, res, next) =>{
    const bearerToken = req?.headers?.authorization;
    if(!bearerToken || !bearerToken.startsWith('Bearer ')){
        return res.status(400).json({message:"invalid", status:'failed'});
    } 
    const token = bearerToken.split(" ")[1];
    let user;
    try{
        user = await verifyToken(token);
    }catch(e) {
        return res.status(500).send({message: e.message, status:'failed'});
    }

    if(!user){
        return res.status(500).send({message: e.message, status:'failed'});
    }
    req.user = user;
    return next();
}

module.exports = authenticate;