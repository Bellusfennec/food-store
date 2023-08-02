import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import userSlicer from "./userSlicer";
import { logger } from "./middleware/logger";
import productReducer from "./productSlicer";

const rootReducer = combineReducers({
  auth: authSlicer,
  user: userSlicer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
