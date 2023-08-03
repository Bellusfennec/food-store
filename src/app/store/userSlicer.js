import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import { setError } from "./errorsSlicer";

const initialState = {
  entities: [],
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    create(state, action) {
      state.entities = [...state.entities, action.payload];
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    requested(state) {
      state.isLoading = true;
    },
    requestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
const { set, create, update, remove, requested, requestFailed } = actions;

export const loadUser = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const data = await userService.get(id);
    dispatch(set(data));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const createUser = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { data } = await userService.create(payload);
    dispatch(create(data));
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

export const getUser = () => (state) => state.user.entities;
export const getUserLoadingStatus = () => (state) => state.user.isLoading;

export default userReducer;
