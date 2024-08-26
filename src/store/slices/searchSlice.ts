import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { discoverMovieDto, searchMovieResponse } from "../types";

const searchSlice = createApi({
  reducerPath: "searchSlice",
  baseQuery,
  endpoints: (builder) => ({
    getMovies: builder.query<searchMovieResponse, discoverMovieDto>({
      query: (params) => ({
        url: "/discover/movie",
        params,
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = searchSlice;

export default searchSlice;
