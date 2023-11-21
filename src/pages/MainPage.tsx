import { useState, useEffect, useRef } from "react";
import { MovieRow } from "../components/MovieScroller/MovieRow";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { fetchMoviesSortBy } from "../api/api";
import { FetchQuery, Movie } from "../constants";
import { MovieDetailsPopup } from "../components/MovieDetailsPopup/MovieDetailsPopup";

import { useParams, useNavigate } from "react-router-dom";

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
  const [detailsMovieID, setDetailsMovieID] = useState<number>();

  const navigate = useNavigate();
  const { id } = useParams();

  const div = useRef<HTMLDivElement>(null);

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

  const handleMovieDetailsClose = () => {
    setDetailsMovieID(undefined);
    navigate("/");
  };

  useEffect(() => {
    const popularMoviesQuery = { sort_by: "popularity.desc" } as FetchQuery;
    const topRatedMoviesQuery = { sort_by: "vote_average.desc" } as FetchQuery;

    addMovieRow("Popular Movies", popularMoviesQuery);
    addMovieRow("Top Rated", topRatedMoviesQuery);
  }, []);

  useEffect(() => {
    // Scrolls to the bottom of the page if new movie rows are added. (Ignores the first default ones)
    if (div.current && (moviesList?.length ?? 0) > 2)
      div.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [moviesList]);

  useEffect(() => {
    if (id) setDetailsMovieID(parseFloat(id));
  }, [id]);

  return (
    <div className=" bg-zinc-900">
      {detailsMovieID && (
        <MovieDetailsPopup
          movieID={detailsMovieID}
          onClose={() => handleMovieDetailsClose()}
        />
      )}
      <div className="relative flex flex-auto overflow-y-scroll no-scrollbar">
        <div className="z-10">
          <Sidebar addMovieRow={addMovieRow} />
        </div>

        <div className="relative overflow-x-hidden h-screen w-screen z-0">
          {moviesList &&
            moviesList.map((row) => (
              <div key={row.title} ref={div}>
                <MovieRow
                  key={row.title}
                  title={row.title}
                  movies={row.movies || []}
                  scrollToEndCallback={() => fetchNextPage(row)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
