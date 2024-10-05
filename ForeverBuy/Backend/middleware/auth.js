import jwt from 'jsonwebtoken'

function authenticate(req, res, next){
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:`token not sent`})
    }
    try{
        let {id} = jwt.verify(token, process.env.JWT_SECRET);
        req.body.id = id;
        next();
    }
    catch(err){
        return res.json({success:false, message:"invalid token"})
    }   
}

export {authenticate}