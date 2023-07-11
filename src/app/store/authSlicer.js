import { createSlice } from "@reduxjs/toolkit";
import { isJsonString } from "../utils/utils";
import { getAccessToken, removeTokens } from "../services/localStorage.service";
import jwt_decode from "jwt-decode";

const token = getAccessToken();
console.log(token);

const initialState = {
  authState: false,
  userState: {},
  tokenState: token ? token : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state) {
      // const isJson = isJsonString(state.tokenState);
      // const json = isJson ? JSON.parse(state.tokenState) : false;
      const decoded = jwt_decode(state.tokenState);
      if (decoded) {
        const { user_id } = decoded;
        state.authState = true;
        state.userState = { _id: user_id };
      } else {
        if (state.tokenState) removeTokens();
        state.tokenState = false;
        state.authState = false;
        state.userState = {};
      }
    },
    setUser(state, action) {
      const userId = action.payload;
      if (!userId) return;

      state.userState = { _id: userId };
    },
    setLogout(state) {
      if (state.tokenState) removeTokens();
      state.tokenState = false;
      state.authState = false;
      state.userState = {};
    },
    setSignIn(state, action) {
      const userId = action.payload;
      if (!userId) return;

      state.userState = { _id: userId };
      state.authState = true;
    },
  },
});

export const { setAuthState, setLogout, setSignIn, setUser } =
  authSlice.actions;

export default authSlice.reducer;
