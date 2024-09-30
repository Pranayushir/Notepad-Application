var jwt = require('jsonwebtoken');
const secret = "India won world cup after 11 years";

const fetchuser = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please try login with valid token"});
    }
    try {
        const data = jwt.verify(token,secret);
        req.user = data.user;
        next(); 
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Internal error occured!!!"});
    }
}

module.exports = fetchuser;