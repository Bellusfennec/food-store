import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./errors";
import specificationService from "../services/specification.service";

const initialState = {
  entities: [],
  isLoading: true,
};

const specificationSlice = createSlice({
  name: "specification",
  initialState,
  reducers: {
    set(state, action) {
      state.entities = action.payload;
    },
    add(state, action) {
      state.entities = [...state.entities, action.payload];
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
    requestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: specificationReducer } = specificationSlice;
const { set, create, requested, requestFailed } = actions;

export const loadSpecifications = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await specificationService.getAll();
    dispatch(set(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export function setSpecifications(payload) {
  return set(payload);
}
export function createSpecifications(payload) {
  return create(payload);
}

export const getSpecifications = () => (state) => state.specification.entities;
export const getSpecificationsLoadingStatus = () => (state) =>
  state.specification.isLoading;

export default specificationReducer;
