import { createSlice } from "@reduxjs/toolkit";
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
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
      state.isLoading = false;
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
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
    dispatch(created(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};
export const updatedProduct = (payload) => async (dispatch, getState) => {
  const { entities } = getState().product;
  const product = entities.find((p) => p._id === payload._id);
  dispatch(requested());
  try {
    console.log(payload, product);
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
      if (updatedArray) {
        for (let i = 0; i < createdArray.length; i++) {
          const item = { ...createdArray[i], _id: uuidv4() };
          await productSpecificationService.update(item);
        }
      }
      if (createdArray) {
        for (let i = 0; i < createdArray.length; i++) {
          const item = { ...createdArray[i], _id: uuidv4() };
          const { content } = await productSpecificationService.create(item);
          payload.specifications[i] = content._id;
        }
      }
      if (deletedArray) {
        for (let i = 0; i < deletedArray.length; i++) {
          const item = deletedArray[i]._id;
          await productSpecificationService.delete(item);
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

export function updateProduct1(payload) {
  return updated(payload);
}
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
