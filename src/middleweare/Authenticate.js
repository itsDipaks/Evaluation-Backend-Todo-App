require("dotenv").config()
var jwt = require('jsonwebtoken');
const Authenticate=(req,res,next)=>{
    const token=req.headers.token
    jwt.verify(token,process.env.SECRET_KEY , function(err, decoded) {
        if(decoded){
            const user_id=decoded.user_id
            req.body.user_id=user_id
            next()
        }else{
            res.send({msg:'Authentication Faild',err:err})
        }
      });
}
module.exports={Authenticate}