import { useEffect } from "react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Movie } from "../../constants";
import { MovieCard } from "./MovieCard";
import { debounce } from "../../utils";
import { MovieSkeleton } from "./MovieSkeleton";

export const MovieRow = ({
  title,
  movies,
  scrollToEndCallback,
}: {
  title: string;
  movies: Movie[];
  scrollToEndCallback: () => void;
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

  return (
    <>
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <h2 className="text-center font-roboto text-5xl text-white">{title}</h2>
      <hr className=" mx-auto my-8 w-1/2 text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

      <div
        {...events}
        ref={ref}
        className="flex gap-2 m-2 mt-8 overflow-x-scroll no-scrollbar"
        id={`row_${title}`}
        style={{ cursor: "default", height: "500px" }}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}

        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
      </div>
    </>
  );
};
