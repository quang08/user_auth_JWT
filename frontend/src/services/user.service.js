/* User data services:
- Uses axios to retreive data from the server
- Since HttpOnly Cookies will be automatically sent along with HTTP request, simply use axios without caring about JWT
*/

import axios from "axios";

const API_URL = "http://localhost:3001/api/test";

const getUserBoard = async () => {
    return axios.get(API_URL + "user")
};

const getAminBoard = async () => {
    return axios.get(API_URL + "admin")
};

const getModeratorBoard = async () => {
    return axios.get(API_URL + "mod")
};

const getPublicContent = async () => {
    return axios.get(API_URL + "all")
};

const UserService = {
  getAminBoard,
  getModeratorBoard,
  getPublicContent,
  getUserBoard,
};

export default UserService;
