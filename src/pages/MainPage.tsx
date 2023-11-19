import { useState, useEffect } from "react";
import { MovieRow } from "../components/MovieScroller/MovieRow";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { fetchPopularMovies } from "../api/api";
import { Movie } from "../constants";

type PopularMoviesApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const MainPage = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchPopularMovies().then((response) => {
      const apiResponse = response.data as PopularMoviesApiResponse;
      setPopularMovies(apiResponse.results);
    });
  }, []);

  return (
    <div className=" bg-zinc-900">
      <div className="flex flex-auto overflow-y-scroll no-scrollbar">
        <Sidebar />

        <div className="overflow-x-hidden w-screen">
          <MovieRow title="Featuring Movies" movies={popularMovies || []} />

          <MovieRow title="Featuring Movies" movies={popularMovies || []} />

          <MovieRow title="Featuring Movies" movies={popularMovies || []} />
        </div>
      </div>
    </div>
  );
};
