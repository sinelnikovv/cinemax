import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import {
  CastResponce,
  MovieResponseType,
  UpcomingMoviesResponse,
} from "../types";

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
    getMovie: builder.query<MovieResponseType, { id: number }>({
      query: ({ id }) => `/movie/${id}`,
    }),
    getCast: builder.query<CastResponce, { id: number }>({
      query: ({ id }) => `/movie/${id}/credits`,
    }),
  }),
});

export const { useGetUpcomingQuery, useGetMovieQuery, useGetCastQuery } =
  upcomingSlice;
