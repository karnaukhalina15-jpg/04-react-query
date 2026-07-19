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

// 1. Додаємо другий параметр page (за замовчуванням 1)
// 2. Змінюємо тип повернення на Promise<FetchMoviesResponse>
export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<FetchMoviesResponse> => {
  const response = await movieInstance.get<FetchMoviesResponse>(
    "/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page, // 3. Передаємо поточну сторінку в параметри запиту
      },
    },
  );

  // 4. Повертаємо весь об'єкт response.data, а не тільки results
  return response.data;
};
