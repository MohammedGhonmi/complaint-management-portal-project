const jwt = require('jsonwebtoken');
const User = require('./models/user');

// basic check if the user is even have a jwt or authenticated into the system
const authUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (tokenErr, user) => {
        if(tokenErr){
            return res.status(401).json({err:'Invalid token'});
        }else{
            User.count({_id: user._id}, function (err, count){ 
                if(count <= 0){
                    return res.status(401).json({err:'User does not exist!'});
                }else{
                    req.user = user
                    next()
                }
            });
        } 
    })
}

// figuring out what role the user have
const authRole = (role) => {
    return (req, res, next) => {
        console.log(req.user.role,role)
        if (req.user.role.toLowerCase() !== role.toLowerCase()) {
            res.status(403);
            return res.json({err:'Not allowed'});
        }
        next()
    }
}
  
module.exports = {
    authUser,
    authRole
}