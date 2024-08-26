import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  name: string;
  email: string;
};
type UserState = User | null;
const initialState: UserState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
