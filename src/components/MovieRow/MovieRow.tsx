import React, { useEffect, useState, useRef } from "react";
import { IoIosMore } from "react-icons/io";
import { useDraggable } from "react-use-draggable-scroll";
import { FetchQuery, Movie } from "../common/constants";
import { debounce } from "../../utils";
import { MovieCard } from "./MovieCard";
import { MovieSkeleton } from "./MovieSkeleton";
import { MoviesRowProps } from "../MovieBrowser/MovieBrowser";
import { QueryEditor } from "../QueryEditor/QueryEditor";

export const MovieRow = ({
  title,
  movies,
  rowData,
  allowQueryEditor,
  scrollToEndCallback,
  handleQueryUpdateCallback,
}: {
  title: string;
  movies: Movie[];
  rowData: MoviesRowProps;
  allowQueryEditor: boolean;
  scrollToEndCallback: (row: MoviesRowProps) => void;
  handleQueryUpdateCallback: (
    row: MoviesRowProps,
    fetchQuery: FetchQuery
  ) => void;
}) => {
  const [queryEditorVisible, setQueryEditorVisible] = useState(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const rowDataRef = useRef(rowData);

  const { events } = useDraggable(ref);
  const debouncedFetch = debounce(
    () => scrollToEndCallback(rowDataRef.current),
    50
  );

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    const scrollPercentage =
      (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;

    if (scrollPercentage >= 80) debouncedFetch();
  };

  useEffect(() => {
    rowDataRef.current = rowData;
  }, [rowData]);

  useEffect(() => {
    const scrollContainer = document.getElementById(`row_${title}`);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      scrollContainer.addEventListener("touchmove", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("touchmove", handleScroll);
      };
    }
  }, []);

  const handleQueryUpdate = (query: FetchQuery) => {
    handleQueryUpdateCallback(rowData, query);
  };

  const handleQueryEditorClose = () => {
    setQueryEditorVisible(!queryEditorVisible);
  };

  {
    /* TODO: Make skeletons dynamic*/
  }
  return (
    <div className="relative">
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <h2 className="text-center font-roboto text-5xl text-white">{title}</h2>
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

      {allowQueryEditor && (
        <div className="flex justify-center mx-auto cursor-pointer active:scale-100 hover:scale-150 transition-all duration-150">
          <IoIosMore
            size={26}
            color="white"
            onClick={() => setQueryEditorVisible(true)}
          />
        </div>
      )}

      {queryEditorVisible && (
        <QueryEditor
          currentQuery={rowData.fetchQuery}
          onClose={handleQueryEditorClose}
          newQueryCallback={handleQueryUpdate}
        />
      )}

      <div
        {...events}
        ref={ref}
        className="flex gap-2 m-2  overflow-x-scroll no-scrollbar"
        id={`row_${title}`}
        style={{ cursor: "default", height: "500px" }}
      >
        {rowData.total_pages === 0 ? (
          <div className=" flex mx-auto items-center font-roboto text-white  text-3xl">
            <span style={{ textShadow: "3px 3px 8px rgba(0, 65, 125, 1)" }}>
              No movies found with your criteria...
            </span>
          </div>
        ) : (
          movies &&
          movies.length > 0 && (
            <>
              {movies.map((movie) => (
                <MovieCard
                  key={`${movie.id}_${title + Math.random()}`}
                  movie={movie}
                />
              ))}

              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
            </>
          )
        )}
      </div>
    </div>
  );
};
