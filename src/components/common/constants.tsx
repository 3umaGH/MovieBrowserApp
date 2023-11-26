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
  sort_by?: keyof typeof SORT_BY_OPTIONS;
  with_genres?: number[];
  origin_country?: keyof typeof COUNTRY_OPTIONS,
  page: number;
};

export enum SORT_BY_OPTIONS {
  "popularity.desc" = "Popularity Descending",
  "popularity.asc" = "Popularity Ascending",
  "vote_average.desc" = "Vote Average Descending",
  "vote_average.desc&vote_count.desc" = "Vote Average & Count Descending",
  "vote_average.asc" = "Vote Average Ascending",
  "vote_count.desc" = "Vote Count Descending",
  "vote_count.asc" = "Vote Count Ascending",
  "revenue.desc" = "Revenue Descending",
  "revenue.asc" = "Revenue Ascending",
  "primary_release_date.desc" = "Release Date Descending",
  "primary_release_date.asc" = "Release Date Ascending",
}

export enum COUNTRY_OPTIONS {
  "ALL" = "All Countries", // Used only in QueryEditor
  "AF" = "Afghanistan",
  "AL" = "Albania",
  "DZ" = "Algeria",
  "AR" = "Argentina",
  "AM" = "Armenia",
  "AU" = "Australia",
  "AT" = "Austria",
  "AZ" = "Azerbaijan",
  "BD" = "Bangladesh",
  "BY" = "Belarus",
  "BE" = "Belgium",
  "BJ" = "Benin",
  "BR" = "Brazil",
  "BG" = "Bulgaria",
  "BF" = "Burkina Faso",
  "BI" = "Burundi",
  "KH" = "Cambodia",
  "CM" = "Cameroon",
  "CA" = "Canada",
  "CF" = "Central African Republic",
  "TD" = "Chad",
  "CL" = "Chile",
  "CN" = "China",
  "CO" = "Colombia",
  "CG" = "Congo (Congo-Brazzaville)",
  "CD" = "Congo (Congo-Kinshasa)",
  "CR" = "Costa Rica",
  "HR" = "Croatia",
  "CU" = "Cuba",
  "CY" = "Cyprus",
  "CZ" = "Czechia",
  "DK" = "Denmark",
  "DO" = "Dominican Republic",
  "EE" = "Estonia",
  "EC" = "Ecuador",
  "EG" = "Egypt",
  "SV" = "El Salvador",
  "ET" = "Ethiopia",
  "FI" = "Finland",
  "FR" = "France",
  "GE" = "Georgia",
  "DE" = "Germany",
  "GH" = "Ghana",
  "GR" = "Greece",
  "GT" = "Guatemala",
  "HN" = "Honduras",
  "HK" = "Hong Kong",
  "HU" = "Hungary",
  "IN" = "India",
  "ID" = "Indonesia",
  "IR" = "Iran",
  "IQ" = "Iraq",
  "IE" = "Ireland",
  "IL" = "Israel",
  "IT" = "Italy",
  "CI" = "Ivory Coast",
  "JP" = "Japan",
  "JO" = "Jordan",
  "KZ" = "Kazakhstan",
  "KE" = "Kenya",
  "KR" = "South Korea",
  "KW" = "Kuwait",
  "KG" = "Kyrgyzstan",
  "LV" = "Latvia",
  "LB" = "Lebanon",
  "LR" = "Liberia",
  "LY" = "Libya",
  "LT" = "Lithuania",
  "LU" = "Luxembourg",
  "MO" = "Macao",
  "MK" = "North Macedonia",
  "MG" = "Madagascar",
  "MY" = "Malaysia",
  "ML" = "Mali",
  "MR" = "Mauritania",
  "MX" = "Mexico",
  "MD" = "Moldova",
  "MN" = "Mongolia",
  "MA" = "Morocco",
  "MZ" = "Mozambique",
  "MM" = "Myanmar",
  "NA" = "Namibia",
  "NP" = "Nepal",
  "NL" = "Netherlands",
  "NZ" = "New Zealand",
  "NI" = "Nicaragua",
  "NE" = "Niger",
  "NG" = "Nigeria",
  "NO" = "Norway",
  "OM" = "Oman",
  "PK" = "Pakistan",
  "PA" = "Panama",
  "PE" = "Peru",
  "PH" = "Philippines",
  "PL" = "Poland",
  "PT" = "Portugal",
  "QA" = "Qatar",
  "RO" = "Romania",
  "RU" = "Russia",
  "RW" = "Rwanda",
  "SA" = "Saudi Arabia",
  "SN" = "Senegal",
  "RS" = "Serbia",
  "SG" = "Singapore",
  "SK" = "Slovakia",
  "SI" = "Slovenia",
  "ZA" = "South Africa",
  "ES" = "Spain",
  "LK" = "Sri Lanka",
  "SD" = "Sudan",
  "SE" = "Sweden",
  "CH" = "Switzerland",
  "SY" = "Syria",
  "TW" = "Taiwan",
  "TJ" = "Tajikistan",
  "TZ" = "Tanzania",
  "TH" = "Thailand",
  "TG" = "Togo",
  "TT" = "Trinidad and Tobago",
  "TN" = "Tunisia",
  "TR" = "Turkey",
  "UG" = "Uganda",
  "UA" = "Ukraine",
  "AE" = "United Arab Emirates",
  "GB" = "United Kingdom",
  "US" = "United States",
  "UY" = "Uruguay",
  "UZ" = "Uzbekistan",
  "VE" = "Venezuela",
  "VN" = "Vietnam",
  "YE" = "Yemen",
  "ZM" = "Zambia",
  "ZW" = "Zimbabwe",
}
