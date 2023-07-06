import { createSlice } from "@reduxjs/toolkit";
import { isJsonString } from "../utils/utils";

const tokenState = localStorage.getItem("token-access")
  ? localStorage.getItem("token-access")
  : false;

const initialState = {
  authState: false,
  userState: {},
  tokenState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state) {
      const isJson = isJsonString(state.tokenState);
      const json = isJson ? JSON.parse(state.tokenState) : false;
      if (json.token) {
        state.authState = true;
        state.userState = { token: json.token };
      } else {
        if (state.tokenState) localStorage.removeItem("token-access");
        state.authState = false;
        state.tokenState = false;
        state.userState = {};
      }
    },
    setUser(state, action) {
      const user = action.payload;
      if (!user) return;

      state.userState = user;
    },
    setLogout(state, action) {
      if (state.tokenState) localStorage.removeItem("token-access");
      state.authState = false;
      state.tokenState = false;
      state.userState = {};
    },
    setLogin(state, action) {
      const user = action.payload;
      if (!user) return;

      /* Сохранить в localStorage */
      const token = JSON.stringify({ token: user.uuid });
      localStorage.setItem("token-access", token);

      state.userState = user;
      state.authState = true;
    },
  },
});

export const { setAuthState, setLogout, setLogin, setUser } = authSlice.actions;

export default authSlice.reducer;
