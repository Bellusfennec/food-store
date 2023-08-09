import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import jwt_decode from "jwt-decode";
import userService from "../services/user.service";
import { setError } from "./errors";
import authService from "../services/auth.service";

const initialState = {
  isLoggedIn: false,
  entity: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    check(state) {
      const accessToken = localStorageService.getAccessToken();
      state.accessToken = accessToken ? accessToken : false;
      const decoded = state.accessToken ? jwt_decode(state.accessToken) : null;
      const userId = localStorageService.getUserId();
      state.userId = decoded?.user_id === userId ? userId : null;
      state.isuser = state.userId ? true : false;

      if (!state.isuser) localStorageService.removeTokens();
    },
    authRequested(state, action) {
      const data = action.payload;
      if (!data) return;

      state.isuser = true;
      state.userId = data.localId;
      state.accessToken = data.idToken;
    },
    authRequestSuccess(state) {
      state.accessToken = false;
      state.isuser = false;
      state.userId = null;
      localStorageService.removeTokens();
    },
    authRequestFailed(state) {
      state.isLoading = true;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
const { logOut, signIn, signUp, check, requested, requestFailed } = actions;

// function createUser(payload) {
//   return async function (dispatch) {
//     dispatch(userCreateRequested());
//     try {
//       const { content } = await userService.create(payload);
//       dispatch(userCreated(content));
//       history.push("/users");
//     } catch (error) {
//       dispatch(userCreateFailed(error.message));
//     }
//   };
// }
export const userSignUp = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { email, password, ...rest } = payload;
    const content = await authService.registration({ email, password });
    localStorageService.setTokens(content);
    await userService.create({
      _id: content.localId,
      email,
      password,
      ...rest,
    });
    dispatch(signUp(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const userSignIn = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { email, password } = payload;
    const content = await authService.login({ email, password });
    console.log(content);
    localStorageService.setTokens(content);
    dispatch(signIn(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export function checkuser() {
  return check();
}
export function setLogOut() {
  return logOut();
}
export function loadUser() {}
export function updateUser() {}

export const getCurrentUser = () => (state) => state.user.entity;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserIsLoading = () => (state) => state.user.isLoading;

export default userReducer;
