import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    isAuth: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuth = true;
    },
    clearUser: (state) => {
      state.email = null;
      state.isAuth = false;
    },
    setAuthorized: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthorized } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
