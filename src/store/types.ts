export type discoverMovieDto = {
  include_adult: boolean;
  page: number;
  primary_release_year?: number;
  "primary_release_date.gte"?: string; // YYYY-MM-DD
  "primary_release_date.lte"?: string; // YYYY-MM-DD
  sort_by:
    | "original_title.asc"
    | "original_title.desc"
    | "popularity.asc"
    | "popularity.desc"
    | "revenue.asc"
    | "revenue.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "primary_release_date.asc"
    | "primary_release_date.desc"
    | "title.asc"
    | "title.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
  "vote_average.gte"?: number; // float
  "vote_average.lte"?: number; // float
  with_genres?: string;
};

export type searchMovieResponse = {
  page: number;
  results: searchMovieResult[];
  total_pages: number;
  total_results: number;
};

export type searchMovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type searchTVDto = {
  "air_date.gte"?: string; // YYYY-MM-DD
  "air_date.lte"?: string; // YYYY-MM-DD
  first_air_date_year?: number;
  " first_air_date.gte"?: string; // YYYY-MM-DD
  "first_air_date.lte"?: string; // YYYY-MM-DD
  include_adult: boolean;
  page: number;
  sort_by: sortingTV;
  "vote_average.gte"?: number; // float
  "vote_average.lte"?: number; // float
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  without_genres?: string;
  without_keywords?: string;
};

export type sortingTV = {
  sort_by:
    | "original_title.asc"
    | "original_title.desc"
    | "popularity.asc"
    | "popularity.desc"
    | "revenue.asc"
    | "revenue.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "primary_release_date.asc"
    | "title.asc"
    | "title.desc"
    | "primary_release_date.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
};

export type searchTVResponse = {
  page: number;
  results: searchTVResult[];
  total_pages: number;
  total_results: number;
};

export type searchTVResult = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type UpcomingMoviesResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type GenreResponse = {
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};

type ImgItemType = {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ImagePesponceType = {
  backdrops: ImgItemType[];
  logos: ImgItemType[];
  posters: ImgItemType[];
};

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieResponseType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  cast_id: number;
  character: string;
  order: number;
};

type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type CastResponce = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};
