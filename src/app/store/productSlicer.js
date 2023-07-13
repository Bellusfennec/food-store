import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {},
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
