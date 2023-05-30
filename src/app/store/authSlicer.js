import { createSlice } from "@reduxjs/toolkit";
import { isJsonString } from "../../common/utils/utils";

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
    setAuthState(state, action) {
      const auth = action.payload;

      const json = isJsonString(state.tokenState);
      /* если есть токен и true */
      if (Boolean(auth) && json) {
        const token = JSON.parse(state.tokenState);
        state.userState = token;
        state.authState = true;
      } else {
        if (state.tokenState) localStorage.removeItem("token-access");
        state.authState = false;
        state.tokenState = false;
      }
    },
    setAuthLogout(state, action) {
      if (state.tokenState) localStorage.removeItem("token-access");
      state.authState = false;
      state.tokenState = false;
    },
    setAuthLogin(state, action) {
      const { user } = action.payload;

      /* Сохранить в localStorage */
      const item = JSON.stringify({ uuid: user.uuid });
      localStorage.setItem("token-access", item);

      state.userState = user;
      state.authState = true;
    },
  },
});

export const { setAuthState, setAuthLogout, setAuthLogin } = authSlice.actions;

export default authSlice.reducer;
