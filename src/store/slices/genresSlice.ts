import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GenreResponse } from "../types";

export const genresSlice = createApi({
  reducerPath: "genresSlice",
  baseQuery,
  endpoints: (builder) => ({
    getGenres: builder.query<GenreResponse, void>({
      query: () => "/genre/movie/list",
      keepUnusedDataFor: 1500,
    }),
  }),
});

export const { useGetGenresQuery } = genresSlice;
