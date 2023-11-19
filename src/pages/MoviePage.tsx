import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import { CDN_PATH, MovieDetails } from "../constants";

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
            <img className="w-full rounded-t-2xl md:rounded-l-2xl md:rounded-r-none" src={CDN_PATH + movie.poster_path}></img>
          </div>

          <div className="relative col-span-2 flex items-start md:items-center text-white">
            <div className="absolute overflow-hidden w-full h-full rounded-b-2xl md:rounded-r-2xl md:rounded-b-none">
              <img id="movie-background"
                src={CDN_PATH + movie.backdrop_path}
                className="scale-animation absolute w-full h-full -m-16 z-0"
                style={{ filter: "blur(6px) brightness(85%)", transform: "scale(2)", }}
              ></img>
            </div>

            <div className="absolute w-full overflow-hidden" style={{boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)", opacity:"0.95"}}>
              <img
                src={CDN_PATH + movie.backdrop_path}
                className="w-full poster-scale-animation"
                style={{
                  filter:"blur(2px) brightness(70%)",
                  borderRadius:"0px",
                }}
              ></img>
            </div>

            <div className="relative p-4 z-10">
              {/*Title*/}
              <h1 className=" font-roboto text-4xl">
                {movie.title}{" "}
                <span className={`text-gray-300 font-thin`}>
                  ({releaseDate.getFullYear()})
                </span>
              </h1>
              <span
                className={`text-lg font-thin border-white border-2 rounded-md w-fit px-0.5 py-0`}
              >
                PG-13
              </span>

              <span className="ml-2 text-xl font-thin">
                {movie.release_date}
              </span>

              <span className="ml-2 text-xl font-thin">
                •{" "}
                {movie.genres.map((genre, index, array) => (
                  <span key={genre.id}>
                    {genre.name}
                    {array.length - 1 === index ? "" : ", "}
                  </span>
                ))}
              </span>

              <span className="ml-2 text-xl font-thin">
                • {convertMinutesToHoursAndMinutes(movie.runtime)}
              </span>

              <h3>Rating</h3>

              <p>{movie.tagline}</p>

              <p className="font-semibold text-2xl ">Overview</p>

              <p className="max-w-4xl break-words">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
