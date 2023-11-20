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

  const addMovieRow = ({
    title,
    movies,
    page,
    total_pages,
    fetchQuery,
  }: {
    title: string;
    movies: Movie[];
    page: number;
    total_pages: number;
    fetchQuery: FetchQuery;
  }) => {
    setMovies((prevData: MoviesStateProps[] | undefined) => [
      ...(prevData || []),
      {
        title: title,
        movies: movies,
        page: page,
        total_pages: total_pages,
        fetchQuery: fetchQuery,
      },
    ]);
  };

  const fetchNextPage = (row: MoviesStateProps) => {
    if (!(row.page >= row.total_pages)) return;

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

    fetchMoviesSortBy(popularMoviesQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      addMovieRow({
        title: "Featuring Movies",
        movies: apiResponse.results,
        page: apiResponse.page,
        total_pages: apiResponse.total_pages,
        fetchQuery: popularMoviesQuery,
      });
    });

    fetchMoviesSortBy(topRatedMoviesQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      addMovieRow({
        title: "Top rated Movies",
        movies: apiResponse.results,
        page: apiResponse.page,
        total_pages: apiResponse.total_pages,
        fetchQuery: topRatedMoviesQuery,
      });
    });
  }, []);

  return (
    <div className=" bg-zinc-900">
      <div className="relative flex flex-auto overflow-y-scroll no-scrollbar">
        <div className="z-10">
          <Sidebar />
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
