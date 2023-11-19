/*
https://api.themoviedb.org/3/discover/movie?api_key=***&sort_by=popularity.desc&certification_country=US&certification.lte=R&with_original_language=en - popular movies
https://api.themoviedb.org/3/movie/872585?api_key=***&append_to_response=release_dates -details

*/
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchGenres = async () => {
  return await axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
};

export const fetchPopularMovies = async () => {
  return await axios.get(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&certification_country=US&certification.lte=R&with_original_language=en`
  );
};

export const fetchMovieDetails = async (id: String) => {
  return await axios.get(
    `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
};