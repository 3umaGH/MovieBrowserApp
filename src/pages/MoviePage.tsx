import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import { MovieDetails } from "../constants";

import "react-circular-progressbar/dist/styles.css";
import { MovieDetailsSection } from "../components/MovieDetailsSection/MovieDetailsSection";

import { IoArrowBack } from "react-icons/io5";

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
    <div className="bg-zinc-900">
      <div className="relative flex w-screen justify-center p-10 md:p-32 bg-zinc-900">
        <Link to="/">
          <IoArrowBack
            color="white"
            size={45}
            className=" absolute mt-4 top-0 -left-2 hover:scale-150 active:scale-125 transition-transform mx-5 cursor-pointer"
          />
        </Link>
        {movie && <MovieDetailsSection movieData={movie} />}
      </div>
    </div>
  );
};
