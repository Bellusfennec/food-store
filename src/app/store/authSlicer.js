import { createSlice } from "@reduxjs/toolkit";
import { isJsonString } from "../utils/utils";
import { getAccessToken, removeTokens } from "../services/localStorage.service";
import jwt_decode from "jwt-decode";

const accessToken = getAccessToken();
console.log(accessToken);

const initialState = {
  auth: false,
  user: {},
  accessToken: accessToken ? accessToken : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state) {
      // const isJson = isJsonString(state.accessToken);
      // const json = isJson ? JSON.parse(state.accessToken) : false;
      const decoded = jwt_decode(state.accessToken);
      if (decoded) {
        const { user_id } = decoded;
        state.auth = true;
        state.user = { _id: user_id };
      } else {
        if (state.accessToken) removeTokens();
        state.accessToken = false;
        state.auth = false;
        state.user = {};
      }
    },
    setUser(state, action) {
      const userId = action.payload;
      if (!userId) return;

      state.user = { _id: userId };
    },
    setLogout(state) {
      if (state.accessToken) removeTokens();
      state.accessToken = false;
      state.auth = false;
      state.user = {};
    },
    setSignIn(state, action) {
      const userId = action.payload;
      if (!userId) return;

      state.user = { _id: userId };
      state.auth = true;
    },
  },
});

export const { setAuth, setLogout, setSignIn, setUser } = authSlice.actions;

export default authSlice.reducer;
