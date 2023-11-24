import { useState, useEffect, useRef } from "react";
import { MovieRow } from "../modules/MovieRow/components/MovieRow";
import { Sidebar } from "../modules/Sidebar/components/Sidebar";
import {
  fetchMoviesSortBy,
  fetchUpcomingMovies,
} from "../modules/common/api/api";
import { FetchQuery, Movie } from "../modules/common/constants";
import { Modal } from "../modules/MovieDetailsPopup/components/Modal";

import { useParams, useNavigate } from "react-router-dom";
import { AxiosPromise, AxiosResponse } from "axios";

export type MovieListApiResponse = {
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
  fetchFn: (
    fetchQuery: FetchQuery
  ) => Promise<AxiosResponse<MovieListApiResponse, any>>;
};

export const MainPage = () => {
  const [moviesList, setMovies] = useState<MoviesStateProps[]>();
  const [detailsMovieID, setDetailsMovieID] = useState<number>();

  const navigate = useNavigate();
  const { id } = useParams();

  const div = useRef<HTMLDivElement>(null);

  const addMovieRow = (
    title: string,
    fetch: (
      fetchQuery: FetchQuery
    ) => Promise<AxiosResponse<MovieListApiResponse, any>>,
    fetchQuery: FetchQuery
  ) => {
    fetch(fetchQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies((prevData: MoviesStateProps[] | undefined) => [
        ...(prevData || []),
        {
          title: title,
          movies: apiResponse.results,
          page: apiResponse.page,
          total_pages: apiResponse.total_pages,
          fetchQuery: fetchQuery,
          fetchFn: fetch,
        },
      ]);

      setTimeout(() => scrollToLastMovieRow(), 300);
    });
  };

  const fetchNextPage = (row: MoviesStateProps) => {
    if (row.page >= row.total_pages) return;

    const newQuery = { ...row.fetchQuery, page: ++row.page };
    row.fetchFn(newQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies((prevData) =>
        prevData?.map((prevRow) =>
          prevRow.title === row.title
            ? {
                ...prevRow,
                page: prevRow.page + 1,
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
    addMovieRow("Popular Movies", fetchMoviesSortBy, {
      sort_by: "popularity.desc",
    });
    addMovieRow("Top Rated", fetchMoviesSortBy, {
      sort_by: "vote_average.desc",
    });

    addMovieRow("upcoming", fetchUpcomingMovies, {
      sort_by: "vote_average.desc",
    });
  }, []);

  const scrollToLastMovieRow = () => {
    if (div.current && (moviesList?.length ?? 0) >= 2)
      div.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (id) setDetailsMovieID(parseFloat(id));
  }, [id]);

  return (
    <div className=" bg-zinc-900">
      {detailsMovieID && (
        <Modal
          movieID={detailsMovieID}
          onClose={() => handleMovieDetailsClose()}
        />
      )}
      <div className="relative flex flex-auto overflow-y-scroll no-scrollbar">
        <div className="z-10">
          <Sidebar addMovieRow={addMovieRow} />
        </div>

        <div className="relative overflow-x-hidden h-screen w-screen z-0 no-scrollbar">
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
