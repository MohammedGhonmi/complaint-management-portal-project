const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleErrors = require("../error-handler/handle-errors");

// authenticate the jwt if it does exist
const getCurrentUser = (req, res) => res.status(200).json(req.user);

// login the user into the system
const login = async (req, res) => {
  // Authenticate User
  const { username, password } = req.body;

  const user = User.login(username, password)
    .then((user) => {
      const [accessToken, refreshToken] = generateAccessToken(user);
      //res.cookie("token", accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ ...user, accessToken, refreshToken });
    })
    .catch((err) => {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

// signup the user into the system
const register = async (req, res) => {
  const userCreate = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  };

  await User.create(userCreate)
    .then((resUser) => {
      const user = {
        _id: resUser._id,
        username: resUser.username,
        role: resUser.role,
      };
      const [accessToken, refreshToken] = generateAccessToken(user);
      //res.cookie("token", accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ ...user, accessToken, refreshToken });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

// 30 seconds age for access token
const maxAgeAccess = 30;
// 3 days age for refresh token
const maxAgeRefresh = 3 * 24 * 60 * 60;

// generate token
generateAccessToken = (user) => {
  return [
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: maxAgeAccess,
    }),
    jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: maxAgeRefresh,
    }),
  ];
};

module.exports = {
  getCurrentUser,
  register,
  login,
};
