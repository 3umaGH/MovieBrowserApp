import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import { MovieDetails } from "../constants";

import "react-circular-progressbar/dist/styles.css";
import { MovieDetailsSection } from "../components/MovieDetailsSection";

export const MoviePage = () => {
  const [movie, setMovieData] = useState<MovieDetails>();
  const { id } = useParams();

  useEffect(() => {
    if (id)
      fetchMovieDetails(id).then((response) =>
        setMovieData(response.data as MovieDetails)
      );
  }, []);

  return (
    movie && (
      <div className="flex w-screen p-10">
        <MovieDetailsSection movieData={movie} />
      </div>
    )
  );
};
