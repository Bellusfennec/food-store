import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {},
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
export const { setCategory } = actions;

export default categoryReducer;
