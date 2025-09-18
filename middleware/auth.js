import jwt from 'jsonwebtoken'
import config from 'config'

export function tokenAuth(req,res,next){
    //GET token from header
    const token = req.header('x-auth-token');
    //CHeck if not token 
    if(!token){
        return res.status(401).json({msg:'No token, authoriztion denied'});
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:"Token is not valid"})
    }
}