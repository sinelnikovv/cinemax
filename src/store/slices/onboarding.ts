import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    isOnboardingShown: false,
  },
  reducers: {
    onboardingShowed: (state) => {
      state.isOnboardingShown = true;
    },
  },
});

export const { onboardingShowed } = onboardingSlice.actions;
export const isOnboardingShown = (state: RootState) =>
  state.onboarding.isOnboardingShown;
export default onboardingSlice.reducer;
