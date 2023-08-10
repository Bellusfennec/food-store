import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./errors";
import categoryService from "../services/category.service";

const initialState = {
  entities: [],
  isLoading: true,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    productRecived(state, action) {
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

const { actions, reducer: categoryReducer } = categorySlice;
const { productRecived, create, requestFailed, requested } = actions;

export const loadCategories = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await categoryService.getAll();
    dispatch(productRecived(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export function createCategory(payload) {
  return create(payload);
}
export function setCategories(payload) {
  return productRecived(payload);
}

export const getCategories = () => (state) => state.category.entities;
export const getCategoriesLoadingStatus = () => (state) =>
  state.category.isLoading;

export default categoryReducer;
