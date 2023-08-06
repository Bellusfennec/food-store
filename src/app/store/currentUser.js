import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import { setError } from "./errors";
import { setSignIn, setSignUp } from "./auth";

const initialState = {
  entity: {},
  isLoading: true,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    set(state, action) {
      state.entity = action.payload;
      state.isLoading = false;
    },
    create(state, action) {
      state.isLoading = false;
    },
    update(state, action) {},
    remove(state, action) {},
    requested(state) {
      state.isLoading = true;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: currentUserReducer } = currentUserSlice;
const { set, create, update, remove, requested, requestFailed } = actions;

export const loadUser = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await userService.get(id);
    dispatch(set(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    // const { data } = await userService.create(payload);
    // dispatch(create(data));
    // dispatch(setSignIn(data));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export function setUser(payload) {
  return update(payload);
}

export function deleteUser(id) {
  return remove({ id });
}

export const getCurrentUser = () => (state) => state.currentUser.entity;
export const getCurrentUserLoadingStatus = () => (state) =>
  state.currentUser.isLoading;

export default currentUserReducer;
