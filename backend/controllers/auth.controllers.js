/* 2 main functions:
- Sign up: create new User in the database (role user if not specify role)
- Sign in: 
    - check if requested username is in the db
    - compare password using bcrypt
    - if correct, generate jwt token using jsonwebtoken
    - return user info from the db and the access token
*/

const db = require("../models/index");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  })
    .then(async (user) => {
      if (req.body.roles) {
        await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles, // if req.body.roles is ["admin", "moderator"], the resulting query would look like this: SELECT * FROM roles WHERE name = 'admin' OR name = 'moderator';
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered succesfully!" });
          });
        });
      } else {
        //user role = 1
        user.setRoles([1]).then(() => {
          // assign the role with ID 1 to the user
          res.send({ message: "User registered succesfully!" });
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};
