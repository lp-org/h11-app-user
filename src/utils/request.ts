import axios from "axios";
// Set config defaults when creating the instance
export const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
