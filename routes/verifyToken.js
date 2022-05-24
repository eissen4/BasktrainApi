const jwt = require('jsonwebtoken');
const fs = require("fs");

module.exports = function (req,res,next){
    const token = req.header('Authorization');
    console.log(token)
    
    if(!token) return res.status(401).send('Acceso denegado');

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified;
        next();
    }catch (err){
        res.status(400).send('Token inválido')
    }
}