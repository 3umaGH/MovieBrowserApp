import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import { CDN_PATH, MovieDetails } from "../constants";

import "react-circular-progressbar/dist/styles.css";
import { MovieScore } from "../components/MovieScore";

export const MoviePage = () => {
  const [movie, setMovieData] = useState<MovieDetails>({
    adult: false,
    backdrop_path: "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
    belongs_to_collection: null,
    budget: 55000000,
    genres: [
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10749,
        name: "Romance",
      },
    ],
    homepage: "https://www.paramountmovies.com/movies/forrest-gump",
    id: 13,
    imdb_id: "tt0109830",
    original_language: "en",
    original_title: "Forrest Gump",
    overview:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    popularity: 96.525,
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    production_companies: [
      {
        id: 4,
        logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
        name: "Paramount",
        origin_country: "US",
      },
      {
        id: 21920,
        logo_path: null,
        name: "The Steve Tisch Company",
        origin_country: "",
      },
      {
        id: 412,
        logo_path: null,
        name: "Wendy Finerman Productions",
        origin_country: "",
      },
    ],
    production_countries: [
      {
        iso_3166_1: "US",
        name: "United States of America",
      },
    ],
    release_date: "1994-06-23",
    revenue: 677387716,
    runtime: 142,
    spoken_languages: [
      {
        english_name: "English",
        iso_639_1: "en",
        name: "English",
      },
    ],
    status: "Released",
    tagline:
      "The world will never be the same once you've seen it through the eyes of Forrest Gump.",
    title: "Forrest Gump",
    video: false,
    vote_average: 8.476,
    vote_count: 25659,
  });
  const [colorTheme, setColorTheme] = useState<"light" | "dark">("light");
  const { id } = useParams();

  const releaseDate = new Date(movie.release_date);

  useEffect(() => {
    if (id)
      fetchMovieDetails(id).then((response) => {
        setMovieData(response.data as MovieDetails);
        //isItDark(CDN_PATH + movie.backdrop_path, setTheme);
      });
  }, []);

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }

  const setTheme = (isLight: boolean) => {
    setColorTheme(isLight ? "light" : "dark");
    console.log(colorTheme, "light", isLight);
  };

  return (
    movie && (
      <div className="flex justify-center w-screen p-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1">
            <img
              className="w-full rounded-t-2xl md:rounded-l-2xl md:rounded-r-none"
              src={CDN_PATH + movie.poster_path}
            ></img>
          </div>

          <div className="relative col-span-2 flex items-start md:items-center text-white overflow-x-hidden">
            <div className="absolute overflow-hidden w-full h-full rounded-b-2xl md:rounded-r-2xl md:rounded-b-none bg-gray-500 opacity-100 " style={{boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)"}}>
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
                  className="w-full poster-scale-animation"
                  style={{
                    filter: "blur(2px) brightness(50%)",
                    borderRadius: "0px",
                  }}
                ></img>
              </div>
            )}

            <div className="flex flex-col items-start  p-4 z-10">
              <div className="text-xl font-roboto">
                <h1 className="font-roboto text-4xl mb-1.5">
                  {movie.title}{" "}
                  <span className={`text-gray-200 font-thin`}>
                    ({releaseDate.getFullYear()})
                  </span>
                </h1>

                <span
                  className={`border-stone-400 border-2 rounded-md w-fit px-1 py-0.5`}
                >
                  PG-13
                </span>

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

              <div className="flex items-center">
                <div className="w-24 h-24 mt-5 mx-2.5">
                  <MovieScore score={movie.vote_average} />
                </div>
                <div className="pt-3.5">
                  <span className="font-roboto font-medium text-2xl">User<br/>Score</span>
                </div>
              </div>

              <p className="mt-5 text-2xl opacity-65 text-stone-300">
                <i>{movie.tagline}</i>
              </p>

              <p className="font-semibold text-2xl mt-5">Overview</p>

              <p className="max-w-4xl break-words mt-2.5">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
