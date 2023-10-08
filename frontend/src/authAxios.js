import axios from "axios";

const API_URL = "http://localhost:3001/api";

const token = localStorage.getItem("accessToken");

console.log(token);

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default authAxios;
