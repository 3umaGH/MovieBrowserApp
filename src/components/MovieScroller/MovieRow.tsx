import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Movie } from "../../constants";
import { MovieCard } from "./MovieCard";

export const MovieRow = ({
  movies,
}: {
  movies: Movie[];
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <>
     
        <div
        {...events}
        ref={ref}
        className="flex gap-2 m-2 mt-8 overflow-x-scroll no-scrollbar"
        style={{cursor:"default", height:"500px"}}
      >
        {movies && movies.length > 0 && (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)
        )}

      </div>

    </>
  );
};
