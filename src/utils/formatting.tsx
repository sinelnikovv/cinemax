import { GenreResponse } from "@src/store/types";
import moment from "moment";

export const genreIdToName = (allGenreIds: GenreResponse, genreId: number) => {
  const genre = allGenreIds.genres.find((genre) => genre.id === genreId);
  return genre ? genre.name : "";
};

export const formattedDateForUpcoming = (date: string) => {
  return moment(date).format("[On] MMMM DD, YYYY");
};

export const createPath = (path: string) => {
  return `https://image.tmdb.org/t/p/w780${path}`;
};
