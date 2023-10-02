/* We need 2 functions: 
- Check username and email is duplicated
- Check role existed or not
*/

const db = require("../models/index");
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  await User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Failed. Username already existed." });
      return;
    }
  });

  await User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Failed. Email already existed." });
      return;
    }
  });
  next();
};

checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed, role does not exist: " + req.body.roles[i],
        });
        return;
      }
    }
  }
    
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRoleExisted: checkRoleExisted,
};

module.exports = verifySignUp;
