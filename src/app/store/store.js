import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import userSlicer from "./userSlicer";
import { logger } from "./middleware/logger";
import productReducer from "./productSlicer";
import specificationReducer from "./specificationSlicer";
import categoryReducer from "./categorySlicer";
import errorReducer from "./errorsSlicer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authSlicer,
  user: userSlicer,
  product: productReducer,
  category: categoryReducer,
  specification: specificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
