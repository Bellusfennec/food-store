import axios from "axios";

const SERVER_URL = "http://localhost:5000/";

export const HTTP = axios.create({ baseURL: SERVER_URL });
