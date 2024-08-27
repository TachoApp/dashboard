import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const token = localStorage.getItem("tachoTokenBusiness");

const apiHelper = axios.create({
  baseURL: API_BASE_URL,
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

export { apiHelper, apiHelperWithToken };