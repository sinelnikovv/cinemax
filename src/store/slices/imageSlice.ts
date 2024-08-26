import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { ImagePesponceType } from "../types";

export const imageSlice = createApi({
  reducerPath: "imageSlice",
  baseQuery,
  endpoints: (builder) => ({
    getImage: builder.query<ImagePesponceType, { id: number }>({
      query: ({ id }) => `/movie/${id}/images`,
    }),
  }),
});

export const { useGetImageQuery } = imageSlice;
