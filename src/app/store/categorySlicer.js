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

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
