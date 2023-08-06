import axios from "axios";
// import logger from "./log.servive";
import { toast } from "react-toastify";
import configFile from "../../config/index.json";
import localStorageService from "./localStorage.service";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        });
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = {
          ...config.params,
          auth: accessToken,
        };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return !data?._id ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
  // return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
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
  patch: http.patch,
};
export default httpService;
