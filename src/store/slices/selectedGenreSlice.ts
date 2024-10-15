import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const selectedGenreSlice = createSlice({
  name: "selectedGenre",
  initialState: {
    name: "All",
    id: "All",
  },
  reducers: {
    setGenre: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
});

export const { setGenre } = selectedGenreSlice.actions;
export const selectedGenre = (state: RootState) => state.selectedGenre;
export default selectedGenreSlice.reducer;
