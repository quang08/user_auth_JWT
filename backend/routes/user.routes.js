/*
When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will response by setting up the routes.

We can separate our routes into 2 parts: for Authentication and for Authorization (accessing protected resources).

Authorization:
- GET /api/test/all
- GET /api/test/user for logged in users (user/mod/admin)
- GET /api/test/admin
- GET /api/test/mod
*/

const controller = require("../controllers/user.controllers");
const express = require("express");
const router = express.Router();
const { authJwt } = require("../middleware");

router.use((req, res, next) => {
  res.header(
    "Access-Controll-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
  );
  next();
});

router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken], controller.userBoard);

router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard,
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard,
);


module.exports = router