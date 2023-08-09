import axios from "axios";
import localStorageService from "./localStorage.service";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const authService = {
  registration: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signUp`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
  // get: async () => {
  //   const { data } = await httpService.get(authEndPoint);
  //   return data;
  // },
  // create: async (payload) => {
  //   const { data } = await httpService.put(authEndPoint + payload._id, payload);
  //   return data;
  // },
  // getCurrentauth: async () => {
  //   const { data } = await httpService.get(
  //     authEndPoint + localStorageService.getauthId()
  //   );
  //   return data;
  // },
  // update: async (payload) => {
  //   const { data } = await httpService.patch(
  //     authEndPoint + localStorageService.getauthId(),
  //     payload
  //   );
  //   return data;
  // }
};
export default authService;
