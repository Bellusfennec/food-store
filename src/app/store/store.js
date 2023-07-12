import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import userSlicer from "./userSlicer";

const store = configureStore({
  reducer: {
    auth: authSlicer,
    user: userSlicer,
  },
});

export default store;
