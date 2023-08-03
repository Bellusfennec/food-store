import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  isLoading: true,
};

const categorySlice = createSlice({
  name: "category",
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
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
const { set, create, update, remove, requested, requestFailed } = actions;

export function createCategory(payload) {
  return create(payload);
}
export function setCategories(payload) {
  return set(payload);
}

export const getCategories = () => (state) => state.category.entities;
export const getCategoriesLoadingStatus = () => (state) =>
  state.category.isLoading;

export default categoryReducer;
