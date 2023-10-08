/* Auth services:
- Uses axios for HTTP requests and LocalStorage for user information & JWT
*/

import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

const register = async (username, email, password) => {
  return await axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

//Login: retrieve user login information and store it in localStorage
const login = async (username, password) => {
  return await axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data;
    });
};

//logout: remove user info from localStorage
const logout = async () => {
  localStorage.removeItem("user");
  return await axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
