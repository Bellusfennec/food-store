import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      isLoggedIn: true,
      entity: { _id: localStorageService.getUserId() },
      isLoading: true,
      isLoadingAuth: false,
      error: null,
    }
  : {
      isLoggedIn: false,
      entity: {},
      isLoading: false,
      isLoadingAuth: false,
      error: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userRecived: (state, action) => {
      state.entity = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userCreated: (state, action) => {
      state.entity = { ...state.entity, ...action.payload };
    },
    userUpdated: (state, action) => {
      state.entity = { ...state.entity, ...action.payload };
    },
    authRequested: (state) => {
      state.isLoadingAuth = true;
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.entity = { ...state.entity, ...action.payload };
      state.isLoggedIn = true;
      state.isLoadingAuth = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoadingAuth = false;
    },
    userLoggedOut: (state) => {
      state.entity = {};
      state.isLoggedIn = false;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
const {
  userLoggedOut,
  userRequested,
  userRecived,
  userRequestFailed,
  userCreated,
  userUpdated,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export const registeredUser = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { email, password, ...rest } = payload;
    const content = await authService.registration({ email, password });
    localStorageService.setTokens(content);
    dispatch(authRequestSuccess({ _id: content.localId }));
    dispatch(createUser({ _id: content.localId, email, password, ...rest }));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const loggedInUser = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { email, password } = payload;
    const content = await authService.login({ email, password });
    localStorageService.setTokens(content);
    dispatch(authRequestSuccess({ _id: content.localId }));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const loggedOutUser = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(userLoggedOut());
};

export const loadedUser = () => async (dispatch, getState) => {
  const { entity } = getState().user;
  dispatch(userRequested());
  try {
    const { content } = await userService.get(entity._id);
    dispatch(userRecived(content));
  } catch (error) {
    dispatch(userRequestFailed(error));
  }
};

export const updatedUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdated(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getCurrentUser = () => (state) => state.user.entity;
export const getLoggedStatus = () => (state) => state.user.isLoggedIn;
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getAuthLoadingStatus = () => (state) => state.user.isLoadingAuth;
export const getUserError = () => (state) => state.user.error;

export default userReducer;
