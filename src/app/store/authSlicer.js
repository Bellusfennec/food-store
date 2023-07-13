import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken, removeTokens } from "../services/localStorage.service";
import jwt_decode from "jwt-decode";

const accessToken = getAccessToken();

const initialState = {
  auth: false,
  userId: null,
  accessToken: accessToken ? accessToken : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state) {
      const decoded = jwt_decode(state.accessToken);

      if (decoded) {
        const { user_id } = decoded;

        state.auth = true;
        state.userId = user_id;
      } else {
        if (state.accessToken) removeTokens();

        state.accessToken = false;
        state.auth = false;
        state.userId = null;
      }
    },
    setLogout(state) {
      if (state.accessToken) removeTokens();

      state.accessToken = false;
      state.auth = false;
      state.userId = null;
    },
    setSignIn(state, action) {
      const data = action.payload;
      if (!data) return;

      state.auth = true;
      state.userId = data.localId;
      state.accessToken = data.idToken;
    },
  },
});

export const { setAuth, setLogout, setSignIn } = authSlice.actions;

export default authSlice.reducer;
