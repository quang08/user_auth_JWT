/* We need middlewares to:
- verify JWT token legal or not. Take token from x-access-token of the HTTP header then use jsonwebtoken's verify()
- check isAdmin
- check isUser
- check isModerator
*/

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded;
    next();
  });
};

isAdmin = (req, res, next) => {
  next();
};

isUser = (req, res, next) => {
  next();
};

isModerator = (req, res, next) => {
  next();
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isModerator: isModerator,
};

module.exports = authJwt;
