import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
const API_BASE_URL2 = `${import.meta.env.VITE_API_BASE_URL2}`;

const token = localStorage.getItem("tachoToken");

const apiHelper = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiHelper2 = axios.create({
  baseURL: API_BASE_URL2,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiHelperWithToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export { apiHelper, apiHelper2, apiHelperWithToken };