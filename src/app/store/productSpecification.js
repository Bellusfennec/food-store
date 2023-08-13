import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import productSpecificationService from "../services/productSpecification.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

const productSpecificationSlice = createSlice({
  name: "productSpecification",
  initialState,
  reducers: {
    recived(state, action) {
      const entities = state.entities.filter(
        (el) => el._id !== action.payload._id
      );
      state.entities = [...entities, action.payload];
    },
    created(state, action) {
      const entities = state.entities.filter(
        (el) => el._id !== action.payload._id
      );
      state.entities = [...entities, action.payload];
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
    requested(state) {
      state.isLoading = true;
      state.error = null;
    },
    requestFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer: productSpecificationReducer } =
  productSpecificationSlice;
const { recived, created, removed, updated, requested, requestFailed } =
  actions;

export const loadedProductSpecifications =
  (specifications) => async (dispatch) => {
    if (specifications?.length > 0) {
      dispatch(requested());
      try {
        for (let i = 0; i < specifications.length; i++) {
          const id = specifications[i];
          const { content } = await productSpecificationService.get(id);
          dispatch(recived(content));
        }
      } catch (error) {
        dispatch(requestFailed(error.message));
      }
    }
  };
export const createdProductSpecifications = (payload) => async (dispatch) => {
  if (payload?.specifications?.length > 0) {
    const { specifications } = payload;
    dispatch(requested());
    try {
      const specificationsArray = [];
      for (let i = 0; i < specifications.length; i++) {
        const item = { ...specifications[i], _id: uuidv4() };
        await productSpecificationService.create(item);
        specificationsArray.push(item._id);
        dispatch(created(item));
      }
      return specificationsArray;
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  }
};
export const removedProductSpecifications = (payload) => async (dispatch) => {
  if (payload?.specifications?.length > 0) {
    const { specifications } = payload;
    dispatch(requested());
    try {
      for (let i = 0; i < specifications.length; i++) {
        const id = specifications[i];
        await productSpecificationService.delete(id);
        dispatch(removed(id));
      }
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  }
};

export const updatedProductSpecifications = (payload) => async (dispatch) => {
  if (payload?.specifications?.length > 0) {
    const { specifications } = payload;
    dispatch(requested());
    try {
      for (let i = 0; i < specifications.length; i++) {
        const item = specifications[i];
        await productSpecificationService.update(item);
        dispatch(updated(item));
      }
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  }
};

export const getProductSpecificationsById2 =
  (productId) => (dispatch, getState) => {
    const { productSpecification, product } = getState();
    if (productSpecification.entities) {
      const productItem = product.entities.find((p) => p._id === productId);
      if (productItem?.specifications?.length > 0) {
        const { specifications } = productItem;
        // console.log(specifications);
        const specificationsArray = [];
        for (let i = 0; i < specifications.length; i++) {
          const id = specifications[i];
          const specification = productSpecification.entities.find(
            (p) => p._id === id
          );
          if (specification) specificationsArray.push(specification);
        }
        return specificationsArray;
      }
    }
  };
export const getProductSpecificationsById = (productId) => (state) => {
  if (state.productSpecification.entities) {
    const product = state.product.entities.find((p) => p._id === productId);
    if (product?.specifications?.length > 0) {
      const { specifications } = product;
      // console.log(specifications);
      const specificationsArray = [];
      for (let i = 0; i < specifications.length; i++) {
        const id = specifications[i];
        const specification = state.productSpecification.entities.find(
          (p) => p._id === id
        );
        if (specification) specificationsArray.push(specification);
      }
      return specificationsArray;
    }
  }
};
export const getProductSpecificationsLoadingStatus = () => (state) =>
  state.productSpecification.isLoading;

export default productSpecificationReducer;
