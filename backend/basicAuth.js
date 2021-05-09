const jwt = require("jsonwebtoken");
const User = require("./models/user");

// basic check if the user is even have a jwt or authenticated into the system
const authUser = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.headers["x-token"];
  if (token == null) {
    console.log("Null token");
    return res.status(401).json({ err: "Unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (tokenErr, user) => {
    if (tokenErr) {
      const refreshToken = req.headers["x-refresh-token"];
      if (refreshToken == null) return res.status(401).end();
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(401).end();
          const [accessToken] = generateAccessToken({
            _id: user._id,
            name: user.name,
            role: user.role,
          });
          console.log(accessToken);

          res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
          res.set("x-token", accessToken);
          res.set("x-refresh-token", refreshToken);

          doesUserExist(user, req, res, next);
        }
      );
    } else {
      doesUserExist(user, req, res, next);
    }
  });
};

// figuring out what role the user have
const authRole = (role) => {
  return (req, res, next) => {
    console.log(req.user.role, role);
    if (req.user.role.toLowerCase() !== role.toLowerCase()) {
      res.status(403);
      return res.json({ err: "Not allowed" });
    }
    next();
  };
};

const doesUserExist = (user, req, res, next) => {
  User.count({ _id: user._id }, function (err, count) {
    if (count <= 0) {
      console.log("User does not exist");
      return res.status(401).json({ err: "User does not exist!" });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = {
  authUser,
  authRole,
};
