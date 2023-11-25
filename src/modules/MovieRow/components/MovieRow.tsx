import { useEffect } from "react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { FetchQuery, Movie } from "../../common/constants";
import { MovieCard } from "./MovieCard";
import { MovieSkeleton } from "./MovieSkeleton";
import { debounce } from "../../../utils";
import { MoviesStateProps } from "../../MovieBrowser/components/MovieBrowser";

export const MovieRow = ({
  title,
  movies,
  rowData,
  scrollToEndCallback,
  handleQueryUpdateCallback,
}: {
  title: string;
  movies: Movie[];
  rowData: MoviesStateProps;
  scrollToEndCallback: () => void;
  handleQueryUpdateCallback: (row: MoviesStateProps, fetchQuery: FetchQuery) => void;
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const debouncedFetch = debounce(() => scrollToEndCallback(), 50);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    const scrollPercentage =
      (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;

    if (scrollPercentage >= 80) debouncedFetch();
  };

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

  const handleQueryUpdate = () => {
    const query = {
      ...rowData.fetchQuery,
      sort_by: "vote_average.desc",
      with_genres: [120,15],
    } as FetchQuery;

    handleQueryUpdateCallback(rowData, query);
  };

  return (
    <>
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <h2 className="text-center font-roboto text-5xl text-white">{title}</h2>
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

      <button onClick={handleQueryUpdate} className="bg-white">
        set thing
      </button>
      <div
        {...events}
        ref={ref}
        className="flex gap-2 m-2 mt-8 overflow-x-scroll no-scrollbar"
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
    </>
  );
};
