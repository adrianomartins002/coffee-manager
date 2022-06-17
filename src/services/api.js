import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sampleapis.com/",
});

export default api;