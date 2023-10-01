# JWT (JSON Web Token)
- Comparing with Session-based Authentication that need to store Session on Cookie, the big advantage of Token-based Authentication is that we store the JSON Web Token (JWT) on Client side: Local Storage for Browser, Keychain for IOS and SharedPreferences for Android… So we don’t need to build another backend project that supports Native Apps or an additional Authentication module for Native App users.

- There are three important parts of a JWT: Header, Payload, Signature. Together they are combined to a standard structure: `header.payload.signature.`

- The Client typically attaches JWT in **Authorization** header with Bearer prefix:
`Authorization: Bearer [header].[payload].[signature]`

- Or, only in **x-access-token** header:
`x-access-token: [header].[payload].[signature]`

# Flow for User Registration and User Login

The diagram shows flow of User Registration, User Login and Authorization process

<img  alt='flow-chart' src='/imgs/sys.png'>

A legal JWT must be added to HTTP **x-access-token** Header if Client accesses protected routes. Therefore, we have to implement **Refresh Token**:

<img  alt='flow-chart' src='/imgs/refreshToken.png'>

There are 2 endpoints for Authentication:
- `api/auth/signup` for User Registration
- `api/auth/signin` for User Login

If Client wants to send request to protected endpoints, it adds legal JWT to HTTP **x-access-token** Header.

# Backend 

## Overview

<img  alt='flow-chart' src='/imgs/backend.png'>

Via Express routes, **HTTP requests** that matches a route will be checked by **CORS Middleware** before coming to **Security** layer

**Security** layer includes:
- JWT Authentication Middleware: verify Sign up, verify token
- Authorization Middleware: check User's roles within the Database's records

If these middlewares throw any error, a message will be sent as HTTP response

**Controllers** interact with MySQL Database via Sequelize and send **HTTP Response** (token, user information, data based on roles, ...) to client.

## Technology
- Express
- bcryptjs
- jsonwebtoken
- Sequelize
- MySQL

# Frontend

## Overview


<img  alt='flow-chart' src='/imgs/frontend.png'>

- The `App` component is a container with React Router. Basing on the state, the navbar can display its items.
- `Login` & `Register` components both have forms for data submission (with support of `react-validation` library). They call methods from `auth.service` to make login/register requests.
-  `auth.service` methods use `axios` to make HTTP requests. It also stores and get **JWT** from Brower Local Storage inside these methods.
- `Home` component is public for all visitors.
- `Profile` component displays user information after login action is succesful.
- `BoardUser`, `BoardModerator`, `BoardAdmin` components will be displayed by state `user.roles`. In these components, we use `user.service` to access protected routes from Web API.
- `user.serivce` uses `auth-header()` helper function to add JWT to HTTP header. `auth-header()` returns an object containing the JWT of the currently logged in user from LocalStorage.

## Technology
- React
- react-router-dom v6
- axios
- react-validation
- TailwindCSS
- validator