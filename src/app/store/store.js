import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
// import { logger } from "./middleware/logger";
import productReducer from "./product";
import specificationReducer from "./specification";
import categoryReducer from "./category";
import errorReducer from "./errors";

const rootReducer = combineReducers({
  error: errorReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  specification: specificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
