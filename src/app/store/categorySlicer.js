import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesList(state, action) {
      const categories = action.payload;
      state.categories = categories;
    },
    addCategory(state, action) {
      const category = action.payload;
      state.categories = [...state.categories, category];
    },
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
export const { setCategory } = actions;

export default categoryReducer;
