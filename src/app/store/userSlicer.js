import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      if (!user) return;

      state.user = user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
