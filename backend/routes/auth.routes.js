/*
When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will response by setting up the routes.

We can separate our routes into 2 parts: for Authentication and for Authorization (accessing protected resources).

Authentication:
- POST /api/auth/signup
- POST /api/auth/signin
*/

const controller = require("../controllers/auth.controllers");
const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middleware");

// Middleware to set common response headers
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
  );
  next();
});

// Define routes and attach route handlers
router.post(
  "/signup",
  //middlewares
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted],
  controller.signup,
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signOut);

module.exports = router;
