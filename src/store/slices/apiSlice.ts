import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./baseQuery";
import {
  CastResponce,
  discoverMovieDto,
  GenreResponse,
  MovieResponseType,
  searchMovieResponse,
  UpcomingMoviesResponse,
} from "../types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  endpoints: (builder) => ({
    getUpcoming: builder.query<UpcomingMoviesResponse, { page: string }>({
      query: (params) => ({
        url: "/movie/upcoming",
        params,
      }),
    }),
    getMovieDetails: builder.query<MovieResponseType, { id: number }>({
      query: ({ id }) => `/movie/${id}`,
    }),
    getCast: builder.query<CastResponce, { id: number }>({
      query: ({ id }) => `/movie/${id}/credits`,
    }),
    getGenres: builder.query<GenreResponse, void>({
      query: () => "/genre/movie/list",
      keepUnusedDataFor: 1500,
    }),
    getSearchMovies: builder.query<searchMovieResponse, discoverMovieDto>({
      query: (params) => ({
        url: "/discover/movie",
        params,
      }),
    }),
  }),
});

export const {
  useGetUpcomingQuery,
  useGetMovieDetailsQuery,
  useGetCastQuery,
  useGetGenresQuery,
  useGetSearchMoviesQuery,
} = apiSlice;
