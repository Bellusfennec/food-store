import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specifications: [],
};

const specificationSlice = createSlice({
  name: "specification",
  initialState,
  reducers: {
    setSpecificationsList(state, action) {
      const specifications = action.payload;
      state.specifications = specifications;
    },
    addSpecification(state, action) {
      const specification = action.payload;
      state.specifications = [...state.specifications, specification];
    },
  },
});

export const { setSpecificationsList, addSpecification } =
  specificationSlice.actions;

export default specificationSlice.reducer;
