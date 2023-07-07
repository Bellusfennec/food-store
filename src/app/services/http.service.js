import axios from "axios";
// import logger from "./log.servive";
import { toast } from "react-toastify";
import configFile from "../../config/index.json";

axios.defaults.baseURL = configFile.apiEndPoint;
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    if (configFile.isJsonServer) {
      res.data = { content: res.data };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      // logger.log(error);
      console.log(error);
      toast.info("Что то пошло не так. Попробуйте позже");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default httpService;
