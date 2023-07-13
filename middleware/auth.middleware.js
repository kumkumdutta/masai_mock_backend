var jwt = require('jsonwebtoken');
require("dotenv").config()

const auth = (req,res,next) =>{
  const token = req.headers?.authorization?.split(" ")[1]
   console.log(token)
  if(token){
  jwt.verify(token, process.env.secret_code, function(err, decoded) {
    if(decoded){
        //req.body.userID = decoded.userID
        next()
    }else{
        res.status(400).send({"msg":"Token Invalid"})
    }
  })
}else
  res.status(400).send({"msg":"Token not available"})
}
module.exports={auth}