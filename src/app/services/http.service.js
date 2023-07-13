import axios from "axios";
// import logger from "./log.servive";
import { toast } from "react-toastify";
import configFile from "../../config/index.json";

export const httpAuth = axios.create();
const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      const containSlash = /\//gi.test(res.config.url);
      res.data = { content: containSlash ? res.data : transformData(res.data) };
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};
export default httpService;
