export const CDN_PATH = import.meta.env.VITE_APP_CDN_PATH;

type CommonMovieProperties = {
  adult: boolean;
  backdrop_path: string;
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

export type Movie = CommonMovieProperties & {
  genre_ids: number[];
};

export type MovieDetailsType = CommonMovieProperties & {
  belongs_to_collection: any; // Replace 'any' with the actual type if available
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  release_dates: { results: CountryRelease[] };
  videos: { results: Video[] };
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type ReleaseDate = {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

export type CountryRelease = {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type FetchQuery = {
  sort_by?: "popularity.desc" | "vote_average.desc";
  with_genres?: number[];
  origin_country?: string;
  page: number;
};
