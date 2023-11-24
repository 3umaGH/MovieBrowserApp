import { useState } from "react";
import { CDN_PATH, MovieDetailsType } from "../../common/constants";

import { Actions } from "./Actions";
import { IoMdPlay } from "react-icons/io";

import { MovieScore } from "../../common/components/MovieScore";
import "react-circular-progressbar/dist/styles.css";

import NOPOSTER_IMAGE from "../../../assets/no_poster.jpg";


export const MovieDetails = ({
  movieData,
  setTrailerCallback,
}: {
  movieData: MovieDetailsType;
  setTrailerCallback: (id: string) => void;
}) => {
  const [movie] = useState<MovieDetailsType>(movieData);

  const releaseDate = new Date(movie?.release_date || "01/01/1900");
  const trailerVideos = movie.videos.results.filter(
    (result) => result.type === "Trailer" && result.site === "YouTube"
  );

  const getUSACertificate = () => {
    const dates = movie?.release_dates.results.find(
      (result) => result.iso_3166_1 == "US"
    )?.release_dates;

    return (dates && dates[0].certification) || "";
  };

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const handleViewTrailerClick = () => {
    // Currently gets first video out of a list
    setTrailerCallback(trailerVideos[0].key);
  };

  return (
    movie && (
      <div
        className="overflow-auto"
        style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1 ">
            <img
              className=" rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none "
              src={movie.poster_path ? CDN_PATH + movie.poster_path : NOPOSTER_IMAGE}
              style={{ height: "100%", width: "100%" }}
            ></img>
          </div>

          <div className="relative col-span-2 -ml-4 flex items-start lg:items-center text-white overflow-x-hidden">
            <div
              className="absolute overflow-hidden w-full h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none bg-gray-900 opacity-100 "
              style={{ boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)" }}
            >
              {movie.backdrop_path && (
                <img
                  id="movie-background"
                  src={CDN_PATH + movie.backdrop_path}
                  className="scale-animation w-full h-full -m-16 z-0"
                  style={{
                    filter: "blur(6px) brightness(40%)",
                    transform: "scale(2)",
                  }}
                ></img>
              )}
            </div>
            {movie.backdrop_path && ( // some movies don't have a backdrop.
              <div
                className="absolute w-full overflow-hidden mt-2.5"
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

            <div className="col-span-1 z-10 p-6">
              <div className="flex flex-col w-full h-full items-start justify-between py-2 px-2 z-10 text-center lg:text-left">
                <div className="text-xl font-roboto w-full">
                  <div className="title mt-2">
                    <h1 className="font-roboto text-4xl">
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

                    {movie.runtime !== 0 && (
                      <span className="ml-2 font-light">
                        • {convertMinutesToHoursAndMinutes(movie.runtime)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-center lg:justify-start mt-0">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center">
                      <div className="w-32 h-32 mt-5 mx-2.5">
                        <MovieScore
                          score={movie.vote_average}
                          totalVotes={movie.vote_count}
                        />
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

                <p
                  onClick={() => handleViewTrailerClick()}
                  className="mt-5 w-full text-2xl opacity-65 text-stone-300 text-center lg:text-left"
                >
                  <i>{movie.tagline}</i>
                </p>

                <p className="font-semibold text-2xl mt-5 ">Overview</p>

                <p className="max-w-4xl break-words mt-2.5 mb-5 text-center lg:text-left">
                  {movie.overview !== ""
                    ? movie.overview
                    : "No overview found in database."}
                </p>

                <Actions />

                {trailerVideos.length > 0 && (
                  <button
                    className="py-2 px-4 mt-2 bg-sky-800 text-sky-200 rounded-lg flex items-center justify-center 
                  cursor-pointer hover:bg-sky-600 focus:ring-2 ring-sky-800 active:scale-75 transition-transform; text-xl mx-auto"
                    style={{ width: "120px" }}
                    onClick={handleViewTrailerClick}
                  >
                    <IoMdPlay className="mr-1" size={26} />
                    Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
