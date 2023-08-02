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
const { actions, reducer: productReducer } = productSlice;
export const { setProduct } = actions;

export default productReducer;
