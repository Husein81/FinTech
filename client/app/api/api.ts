import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.111:5000/api",
  timeout: 10000,
});
