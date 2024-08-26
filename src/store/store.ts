import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./slices/user";
import { upcomingSlice } from "./slices/upcomingSlice";
import { genresSlice } from "./slices/genresSlice";
import selectedGenreReducer from "./slices/selectedGenreSlice";
import searchSlice from "./slices/searchSlice";
import { imageSlice } from "./slices/imageSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  [upcomingSlice.reducerPath]: upcomingSlice.reducer,
  [genresSlice.reducerPath]: genresSlice.reducer,
  [searchSlice.reducerPath]: searchSlice.reducer,
  [imageSlice.reducerPath]: imageSlice.reducer,
  selectedGenre: selectedGenreReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(upcomingSlice.middleware)
      .concat(genresSlice.middleware)
      .concat(searchSlice.middleware)
      .concat(imageSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
