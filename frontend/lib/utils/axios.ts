import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this for handling cookies
  timeout: 10000,
});

export default axiosInstance;
