import { useState, useEffect, useRef } from "react";
import { MovieRow } from "../../../modules/MovieRow/components/MovieRow";
import { Sidebar } from "../../../modules/Sidebar/components/Sidebar";
import { FetchQuery, Movie } from "../../../modules/common/constants";
import { Modal } from "../../../modules/MovieDetailsPopup/components/Modal";

import { useParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

export type MoviesStateProps = {
  title: string;
  movies: Movie[];
  total_pages: number;
  fetchQuery: FetchQuery;
  fetchFn: (
    fetchQuery: FetchQuery
  ) => Promise<AxiosResponse<MovieListApiResponse, any>>;
};

export type MovieListApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type MovieBrowserProps = {
  genreSelector?: boolean;
  defaultRows: {
    title: string;
    fetchFn: (
      fetchQuery: FetchQuery
    ) => Promise<AxiosResponse<MovieListApiResponse, any>>;
    fetchQuery: FetchQuery;
  }[];
};

export const MovieBrowser = ({
  genreSelector = true,
  defaultRows,
}: MovieBrowserProps) => {
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
          total_pages: apiResponse.total_pages,
          fetchQuery: { ...fetchQuery, page: apiResponse.page },
          fetchFn: fetch,
        },
      ]);

      setTimeout(() => scrollToLastMovieRow(), 300);
    });
  };

  const fetchNextPage = (row: MoviesStateProps) => {
    if (row.fetchQuery.page >= row.total_pages) return;

    const newQuery = { ...row.fetchQuery, page: ++row.fetchQuery.page };

    row.fetchFn(newQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies((prevData) =>
        prevData?.map((prevRow) =>
          prevRow.title === row.title
            ? {
                ...prevRow,
                fetchQuery: newQuery,
                movies: [...prevRow.movies, ...apiResponse.results],
              }
            : prevRow
        )
      );
    });
  };

  const handleQueryUpdate = (
    row: MoviesStateProps,
    newFetchQuery: FetchQuery
  ) => {
    row.fetchFn(newFetchQuery).then((response) => {
      const apiResponse = response.data as MovieListApiResponse;

      setMovies(
        (prevData) =>
          prevData?.map((prevRow) =>
            prevRow.title === row.title
              ? {
                  ...prevRow,
                  fetchQuery: { ...newFetchQuery, page: 1 },
                  movies: apiResponse.results,
                  total_pages: apiResponse.total_pages,
                }
              : prevRow
          ) ?? []
      );
    });
  };

  const handleMovieDetailsClose = () => {
    setDetailsMovieID(undefined);
    navigate("/");
  };

  useEffect(() => {
    defaultRows.forEach((row) =>
      addMovieRow(row.title, row.fetchFn, row.fetchQuery)
    );
  }, []);

  const scrollToLastMovieRow = () => {
    if (div.current && (moviesList?.length ?? 0) >= defaultRows.length)
      // Do not scroll default rows
      div.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (id) setDetailsMovieID(parseFloat(id));
  }, [id]);

  return (
    <>
      {genreSelector && (
        <div className="z-10">
          <Sidebar addMovieRow={addMovieRow} />
        </div>
      )}

      {detailsMovieID && (
        <Modal
          movieID={detailsMovieID}
          onClose={() => handleMovieDetailsClose()}
        />
      )}
      <div className="relative overflow-x-hidden h-screen w-screen z-0 no-scrollbar">
        {moviesList &&
          moviesList.length === defaultRows.length && // Checking length to display default genres in same order as they were added.
          moviesList.map((row) => (
            <div key={row.title} ref={div}>
              <MovieRow
                key={row.title}
                title={row.title}
                movies={row.movies || []}
                movieRow={row}
                scrollToEndCallback={() => fetchNextPage(row)}
                handleQueryUpdateCallback={handleQueryUpdate}
              />
            </div>
          ))}
      </div>
    </>
  );
};
