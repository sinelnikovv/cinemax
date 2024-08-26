import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Constants from "expo-constants";

export const baseQuery = fetchBaseQuery({
  baseUrl: Constants.expoConfig.extra.API_URL,
  prepareHeaders: (headers) => {
    const token = Constants.expoConfig.extra.TOKEN;
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig.extra.TOKEN}`,
  },
};
