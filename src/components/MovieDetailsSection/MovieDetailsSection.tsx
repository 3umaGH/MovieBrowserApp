import { useState } from "react";
import { CDN_PATH, MovieDetails } from "../../constants";

import "react-circular-progressbar/dist/styles.css";
import { MovieScore } from "../MovieScore";
import { DetailsActionsComponent } from "./DetailsActionsComponent";

export const MovieDetailsSection = ({
  movieData,
}: {
  movieData: MovieDetails;
}) => {
  const [movie] = useState<MovieDetails>(movieData);

  const releaseDate = new Date(movie?.release_date || "01/01/1900");

  const getUSACertificate = () => {
    const dates = movie?.release_dates.results.find(
      (result) => result.iso_3166_1 == "US"
    )?.release_dates;

    return (dates && dates[0].certification) || "";
  };

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }

  return (
    movie && (
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1">
            <img
              className="w-full h-full min-w-max rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none"
              src={CDN_PATH + movie.poster_path}
              style={{
                minWidth: "200px",
              }}
            ></img>
          </div>

          <div className="relative col-span-2 flex items-start lg:items-center text-white overflow-x-hidden">
            <div
              className="absolute overflow-hidden w-full h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none bg-gray-900 opacity-100 "
              style={{ boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)" }}
            >
              <img
                id="movie-background"
                src={CDN_PATH + movie.backdrop_path}
                className="scale-animation absolute w-full h-full -m-16 z-0"
                style={{
                  filter: "blur(6px) brightness(40%)",
                  transform: "scale(2)",
                }}
              ></img>
            </div>

            {movie.backdrop_path && ( // some movies don't have a backdrop.
              <div
                className="absolute w-full overflow-hidden"
                style={{
                  boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
                  opacity: "1",
                }}
              >
                <img
                  src={CDN_PATH + movie.backdrop_path}
                  className="w-full poster-scale-animation hidden md:block"
                  style={{
                    filter: "blur(2px) brightness(50%)",
                    borderRadius: "0px",
                  }}
                />
              </div>
            )}

            <div className="flex flex-col w-full items-start p-4 z-10 text-center lg:text-left">
              <div className="text-xl font-roboto w-full">
                <h1 className="font-roboto text-4xl mb-1.5">
                  {movie.title}{" "}
                  <span className={`text-gray-200 font-thin`}>
                    ({releaseDate.getFullYear()})
                  </span>
                </h1>

                {getUSACertificate() ? (
                  <span
                    className={`border-stone-400 border-2 rounded-md w-fit px-1 py-0.5`}
                  >
                    {getUSACertificate()}
                  </span>
                ) : (
                  <span>•</span>
                )}

                <span className="ml-2">
                  {movie.release_date.replaceAll("-", "/")}
                </span>

                <span className="ml-2 font-light">
                  •{" "}
                  {movie.genres.map((genre, index, array) => (
                    <span key={genre.id}>
                      {genre.name}
                      {array.length - 1 === index ? "" : ", "}
                    </span>
                  ))}
                </span>

                <span className="ml-2 font-light">
                  • {convertMinutesToHoursAndMinutes(movie.runtime)}
                </span>
              </div>

              <div className="flex w-full justify-center lg:justify-start mt-0">
                {movie.vote_average > 0 && (
                  <div className="flex items-center">
                    <div className="w-24 h-24 mt-5 mx-2.5">
                      <MovieScore score={movie.vote_average} />
                    </div>
                    <div className="pt-3.5">
                      <span className="font-roboto font-medium text-2xl">
                        User
                        <br />
                        Score
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-5 w-full text-2xl opacity-65 text-stone-300 text-center lg:text-left">
                <i>{movie.tagline}</i>
              </p>

              <p className="font-semibold text-2xl mt-5 ">Overview</p>

              <p className="max-w-4xl break-words mt-2.5 text-center lg:text-left">
                {movie.overview}
              </p>

              <DetailsActionsComponent />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
