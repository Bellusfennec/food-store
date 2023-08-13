import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import productService from "../services/product.service";
import productSpecificationService from "../services/productSpecification.service";
import {
  createdProductSpecifications,
  removedProductSpecifications,
} from "./productSpecification";

const initialState = {
  entities: [],
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true;
    },
    productRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
    created(state, action) {
      state.entities = [...state.entities, action.payload];
      state.isLoading = false;
    },
    updated(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el._id === action.payload._id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
      state.isLoading = false;
    },
    removed(state, action) {
      state.entities = state.entities.filter((el) => el._id !== action.payload);
      state.isLoading = false;
    },
  },
});
const { actions, reducer: productReducer } = productSlice;
const { productRecived, requested, created, requestFailed, updated, removed } =
  actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.getAll();
    dispatch(productRecived(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};

export const createdProduct = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    payload = { ...payload, _id: uuidv4() };
    payload.specifications = await dispatch(
      createdProductSpecifications(payload)
    );
    const { content } = await productService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const removedProduct = (id) => async (dispatch, getState) => {
  const { entities } = getState().product;
  dispatch(requested());
  try {
    const item = entities.find((p) => p._id === id);
    await dispatch(removedProductSpecifications(item));
    await productService.delete(id);
    dispatch(removed(id));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const updatedProduct = (payload) => async (dispatch, getState) => {
  const { entities } = getState().product;
  const product = entities.find((p) => p._id === payload._id);
  dispatch(requested());
  try {
    console.log("payload", payload);
    console.log("product", product);
    if (payload.specifications.length > 0) {
      const newSpecifications = payload.specifications;
      const oldSpecifications = product?.specifications || [];
      const createdArray = [];
      const updatedArray = [];
      const deletedArray = [];
      newSpecifications.forEach((newS) => {
        const index = oldSpecifications.findIndex((oS) => oS._id === newS._id);
        index !== -1 ? updatedArray.push(newS) : createdArray.push(newS);
      });
      oldSpecifications.forEach((oS) => {
        const index = newSpecifications.findIndex(
          (newS) => newS._id === oS._id
        );
        if (index === -1) deletedArray.push(oS);
      });
      console.log(createdArray, updatedArray, deletedArray);
      if (updatedArray.length > 0) {
        for (let i = 0; i < updatedArray.length; i++) {
          const item = { ...updatedArray[i], _id: uuidv4() };
          const { content } = await productSpecificationService.update(item);
          console.log("upd content", content);
          payload.specifications[i] = content._id;
        }
      }
      if (createdArray.length > 0) {
        for (let i = 0; i < createdArray.length; i++) {
          const item = { ...createdArray[i], _id: uuidv4() };
          const { content } = await productSpecificationService.create(item);
          console.log("creat content", content);
          payload.specifications[i] = content._id;
        }
      }
      if (deletedArray.length > 0) {
        // await dispatch(removedProductSpecifications({_id}));
        for (let i = 0; i < deletedArray.length; i++) {
          const item = deletedArray[i];
          await productSpecificationService.delete(item._id);
        }
      }
    }
    const { content } = await productService.update(payload);
    dispatch(updated(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};
export function removeProduct(id) {
  return removed({ id });
}

export const getProductById = (id) => (state) => {
  if (state.product.entities) {
    return state.product.entities.find((p) => p._id === id);
  }
};
export const getProducts = () => (state) => state.product.entities;
export const getProductsLoadingStatus = () => (state) =>
  state.product.isLoading;

export default productReducer;
