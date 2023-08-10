import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./errors";
import productService from "../services/product.service";
import { v4 as uuidv4 } from "uuid";
import productSpecificationService from "../services/productSpecification.service";

const initialState = {
  entities: [],
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    create(state, action) {
      state.entities = [...state.entities, action.payload];
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    requested(state) {
      state.isLoading = true;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
  },
});
const { actions, reducer: productReducer } = productSlice;
const { productRecived, requested, create, requestFailed, update, remove } =
  actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.getAll();
    const products = [];
    for (let i = 0; i < content.length; i++) {
      let product = content[i];
      if (product.specifications?.length > 0) {
        const specifications = [];
        for (let i = 0; i < product.specifications.length; i++) {
          const id = product.specifications[i];
          const { content } = await productSpecificationService.get(id);
          specifications.push(content);
        }
        products.push({ ...product, specifications });
      } else {
        products.push(product);
      }
    }
    dispatch(productRecived(products));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};

export const createdProduct = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    payload = { ...payload, _id: uuidv4() };
    // Если есть характеристики
    if (payload.specifications.length > 0) {
      for (let i = 0; i < payload.specifications.length; i++) {
        const item = { ...payload.specifications[i], _id: uuidv4() };
        const { content } = await productSpecificationService.create(item);
        payload.specifications[i] = content._id;
      }
    }
    const { content } = await productService.create(payload);
    dispatch(create(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};
export const updatedProduct = (payload) => async (dispatch, getState) => {
  const { entities } = getState().product;
  const product = entities.find((p) => p._id === payload._id);
  dispatch(requested());
  try {
    console.log(product, payload);
    // Если есть характеристики
    // if (payload.specifications.length > 0) {
    //   for (let i = 0; i < payload.specifications.length; i++) {
    //     const item = { ...payload.specifications[i], _id: uuidv4() };
    //     const { content } = await productSpecificationService.create(item);
    //     payload.specifications[i] = content._id;
    //   }
    // }
    // const { content } = await productService.create(payload);
    // dispatch(create(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export function updateProduct1(payload) {
  return update(payload);
}
export function removeProduct(id) {
  return remove({ id });
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
