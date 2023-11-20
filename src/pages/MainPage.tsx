import { useState, useEffect } from "react";
import { MovieRow } from "../components/MovieScroller/MovieRow";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { fetchMoviesSortBy } from "../api/api";
import { FetchQuery, Movie } from "../constants";

type MovieListApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type MoviesStateProps = {
  title: string;
  movies: Movie[];
  page: number;
  total_pages: number;
  fetchQuery: FetchQuery;
};

export const MainPage = () => {
  const [moviesList, setMovies] = useState<MoviesStateProps[]>();

  const addMovieRow = (title: string, fetchQuery: FetchQuery) => {
    fetchMoviesSortBy(fetchQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies((prevData: MoviesStateProps[] | undefined) => [
        ...(prevData || []),
        {
          title: title,
          movies: apiResponse.results,
          page: apiResponse.page,
          total_pages: apiResponse.total_pages,
          fetchQuery: fetchQuery,
        },
      ]);
    });
  };

  const fetchNextPage = (row: MoviesStateProps) => {
    if (row.page >= row.total_pages) return;

    const newQuery = { ...row.fetchQuery, page: ++row.page };
    fetchMoviesSortBy(newQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies((prevData) =>
        prevData?.map((prevRow) =>
          prevRow.title === row.title
            ? {
                ...prevRow,
                page: ++prevRow.page,
                movies: [...prevRow.movies, ...apiResponse.results],
              }
            : prevRow
        )
      );
    });
  };

  useEffect(() => {
    const popularMoviesQuery = { sort_by: "popularity.desc" } as FetchQuery;
    const topRatedMoviesQuery = { sort_by: "vote_average.desc" } as FetchQuery;

    addMovieRow("Popular Movies", popularMoviesQuery);
    addMovieRow("Top Rated", topRatedMoviesQuery);
  }, []);

  return (
    <div className=" bg-zinc-900">
      <div className="relative flex flex-auto overflow-y-scroll no-scrollbar">
        <div className="z-10">
          <Sidebar addMovieRow={addMovieRow} />
        </div>

        <div className="relative overflow-x-hidden h-screen w-screen z-0">
          {moviesList &&
            moviesList.map((row) => (
              <MovieRow
                key={row.title}
                title={row.title}
                movies={row.movies || []}
                scrollToEndCallback={() => fetchNextPage(row)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
