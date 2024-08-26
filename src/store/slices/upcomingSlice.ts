import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { ImagePesponceType, UpcomingMoviesResponse } from "../types";

export const upcomingSlice = createApi({
  reducerPath: "upcomingSlice",
  baseQuery,
  endpoints: (builder) => ({
    getUpcoming: builder.query<UpcomingMoviesResponse, { page: string }>({
      query: (params) => ({
        url: "/movie/upcoming",
        params,
      }),
    }),
    getUpcomingImage: builder.query<ImagePesponceType, { id: number }>({
      query: ({ id }) => `/movie/${id}/images`,
    }),
  }),
});

export const { useGetUpcomingQuery, useGetUpcomingImageQuery } = upcomingSlice;
