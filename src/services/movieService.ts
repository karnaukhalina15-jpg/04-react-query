import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMDB_TOKEN = import.meta.env.VITE_API_KEY;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
  },
});

export interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await movieInstance.get<FetchMoviesResponse>(
    "/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    },
  );
  return response.data.results;
};
