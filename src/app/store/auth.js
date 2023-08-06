import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import jwt_decode from "jwt-decode";
import userService from "../services/user.service";
import { setError } from "./errors";
import { httpAuth } from "../services/http.service";

const initialState = {
  isAuth: false,
  userId: null,
  accessToken: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    check(state) {
      const accessToken = localStorageService.getAccessToken();
      state.accessToken = accessToken ? accessToken : false;
      const decoded = state.accessToken ? jwt_decode(state.accessToken) : null;
      const userId = localStorageService.getUserId();
      state.userId = decoded?.user_id === userId ? userId : null;
      state.isAuth = state.userId ? true : false;

      if (!state.isAuth) localStorageService.removeTokens();
    },
    signUp(state, action) {
      const data = action.payload;
      if (!data) return;

      state.isAuth = true;
      state.userId = data.localId;
      state.accessToken = data.idToken;
    },
    signIn(state, action) {
      const data = action.payload;
      if (!data) return;

      state.isAuth = true;
      state.userId = data.localId;
      state.accessToken = data.idToken;
    },
    logOut(state) {
      state.accessToken = false;
      state.isAuth = false;
      state.userId = null;
      localStorageService.removeTokens();
    },
    requested(state) {
      state.isLoading = true;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;
const { logOut, signIn, signUp, check, requested, requestFailed } = actions;

export const setSignUp = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { email, password, ...rest } = payload;
    console.log("data1", email, password);
    const { data } = await httpAuth.post(`accounts:signUp`, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log("data2", data);
    localStorageService.setTokens(data);
    await userService.create({
      _id: data.localId,
      email,
      password,
      ...rest,
    });
    dispatch(signUp(data));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};
export const setSignIn = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { email, password } = payload;
    const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);
    localStorageService.setTokens(data);
    dispatch(signIn(data));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export function checkAuth() {
  return check();
}
export function setLogOut() {
  return logOut();
}

export const getAuthStatus = () => (state) => state.auth.isAuth;
export const getAuthLoadingStatus = () => (state) => state.auth.isLoading;

export default authReducer;
