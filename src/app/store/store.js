import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import userSlicer from "./userSlicer";
import specificationSlicer from "./specificationSlicer";
import categorySlicer from "./categorySlicer";
import productSlicer from "./productSlicer";

const store = configureStore({
  reducer: {
    auth: authSlicer,
    user: userSlicer,
    category: categorySlicer,
    product: productSlicer,
    specification: specificationSlicer,
  },
});

export default store;
