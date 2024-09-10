import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  name: string;
  email: string;
  userId: string;
};
type UserState = User | null;
const initialState: UserState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
