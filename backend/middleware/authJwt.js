/* We need middlewares to:
- verify JWT token legal or not. Take token from x-access-token of the HTTP header then use jsonwebtoken's verify()
- check isAdmin
- check isModeratorOrAdmin
- check isModerator
*/

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id; //add to the req.object
    next();
  });
};

isAdmin = async (req, res, next) => {
  await User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Admin role required",
      });
      return;
    });
  });
};

isModerator = async (req, res, next) => {
  await User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Moderator role required" });
      return;
    });
  });
};

isAdminOrModerator = async (req, res) => {
  await User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Moderator or Admin role required" });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminOrModerator: isAdminOrModerator,
  isModerator: isModerator,
};

module.exports = authJwt;
