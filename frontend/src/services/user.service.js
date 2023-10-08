/* User data services:
- Uses axios to retreive data from the server
- Since HttpOnly Cookies will be automatically sent along with HTTP request, simply use axios without caring about JWT
*/

import axios from "../authAxios";

const API_URL = "http://localhost:3001/api/test/";

const headers = {
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
};

const getUserBoard = async () => {
  return axios.get(API_URL + "user", headers);
};

const getAminBoard = async () => {
  return axios.get(API_URL + "admin", headers);
};

const getModeratorBoard = async () => {
  return axios.get(API_URL + "mod", headers);
};

const getPublicContent = async () => {
  return axios.get(API_URL + "all");
};

const UserService = {
  getAminBoard,
  getModeratorBoard,
  getPublicContent,
  getUserBoard,
};

export default UserService;
