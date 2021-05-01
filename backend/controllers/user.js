const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let refreshTokens = [];

// authenticate the jwt if it does exist
const isAuth = (req, res) => {
    const accessToken = req.body.token
    if (accessToken == null) return res.status(401).end();
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).end();
      res.json(user)
    })
  };

// refresh access token using refresh token
const getToken = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.status(401).end();
    if (!refreshTokens.includes(refreshToken)) return res.status(401).end();
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).end();
      const accessToken = generateAccessToken({ 
            _id: user._id,
            name: user.name,
            role: user.role
        })
      res.json({ accessToken: accessToken })
    })
  };

// login the user into the system
  const login = (req, res) => {
    // Authenticate User
    User.findOne({
            'username': req.body.username
        })
    .exec()
    .then(async (thisUser) => {
        if (thisUser) {

            const validPassword = await bcrypt.compare(req.body.password , thisUser.password);
            if (!validPassword){
              res.status(400).json({ error: "Invalid Password" }).end();
              return;
            }
            
            const user = {
                _id: thisUser._id,
                name: thisUser.username,
                role: thisUser.role
            }
        
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
        
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
            res
            .status(400)
            .json({ message: "User not found" });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// signup the user into the system
const register = async (req, res) => {
    
    const user = new User(req.body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    user.save()
    .then(result => {    

        const accessToken = generateAccessToken({
            _id: result._id,
            name: result.username,
            role: result.role
        });
    
        res.status(201).json({ 
            accessToken: accessToken,
            message: "Created user successfully"
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

};

// generate token
generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30h' })
}

module.exports = {
    isAuth,
    register,
    login,
    getToken
} 