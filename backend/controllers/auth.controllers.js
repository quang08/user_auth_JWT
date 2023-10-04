/* 2 main functions for Authentication controllers:
- Sign up: create new User in the database (role user if not specify role)
- Sign in: 
    - check if requested username is in the db
    - compare password using bcrypt
    - if correct, generate jwt token using jsonwebtoken
    - return user info from the db and the access token
- Signn out:
  - clear session in request
*/

const db = require("../models/index");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  //find the user
  await User.findOne({
    where: {
      username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      //validate password
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid password" });
      }

      //create the token
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, //24hrs
      });

      //attatch token into the session
      req.session.token = token;

      //take the user associated roles from DB and attach to response
      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

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

exports.signOut = async (req, res) => {
  req.session = null;
  return res
    .status(200)
    .send({ message: "You have successfully logged out. " });
};
