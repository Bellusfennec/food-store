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

export const { setCategoriesList, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
