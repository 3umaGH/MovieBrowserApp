import { useState } from "react";
import { useSelector } from "react-redux";

import { CDN_PATH, Movie } from "../common/constants";
import { RootState } from "../../app/Store";
import { Link } from "react-router-dom";

import NOPOSTER_IMAGE from "../../assets/no_poster.png";

import { IoMdShare } from "react-icons/io";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const parameters = useSelector((state: RootState) => state.parameters);
  const [isFavorited, setFavorited] = useState(false);

  const toggleFavorite = () => setFavorited(!isFavorited);

  const matchGenreByID = (id: Number) => {
    return parameters.genres.find((genre) => genre.id == id)?.name || "";
  };

  return (
    <div
      className="rounded-b-xl group py-1 cursor-default overflow-y-clip"
      style={{ maxWidth: "320px", height: "100%" }}
    >
      <Link to={`/${movie.id}`}>
        <div
          className="relative rounded-2xl w-80 overflow-auto cursor-pointer"
          style={{
            backgroundImage: `url(${
              movie.poster_path ? CDN_PATH + movie.poster_path : NOPOSTER_IMAGE
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minWidth: "100%",
            minHeight: "100%",
          }}
        />

        <div
          className="flex flex-col px-4 opacity-0 -translate-y-16 group-hover:-translate-y-full group-hover:opacity-100 transition-all duration-500 text-slate-100 rounded-b-xl"
          style={{
            width: "100%",
            height: "60%",
            background:
              "linear-gradient(to bottom, rgba(13, 14, 15, 0.1) 0%, rgba(13, 14, 15, 0.8) 10%)",
          }}
        >
          <h4 className="font-mono text-xl text-left mt-3">{movie.title}</h4>

          <p
            className="font-extralight ml-0.5 text-stone-300 text-sm"
            style={{ flexGrow: 0 }}
          >
            {!parameters.loading &&
              movie.genre_ids.map((genreID, index, array) => (
                <span className="mr-0" key={genreID}>
                  {matchGenreByID(genreID)}
                  {array.length - 1 === index ? "." : ", "}
                </span>
              ))}
          </p>

          <div className="flex justify-between mt-3" style={{ flexGrow: 0 }}>
            <span className="font-medium">Summary</span>

            <div className="flex items-center ">
              <p className="mr-1 font-thin">{movie.vote_average}/10</p>
              <MdOutlineStarPurple500 color="gold" />
            </div>
          </div>

          <div
            className="mt-3 overflow-clip text-ellipsis flex-nowrap"
            style={{ flexGrow: 3 }}
          >
            <p className="font-extralight text-xs ">{movie.overview}</p>
          </div>

          <div className="my-3 flex justify-between items-center ">
            <button className="flex items-center border-cyan-950 border-2 py-1 px-2 text-cyan-600 hover:bg-cyan-800 hover:text-cyan-50 transition-colors duration-300 cursor-pointer">
              <IoMdPlay className="mr-1" />
              Movie Details
            </button>

            <div className="flex gap-3 text-cyan-600">
              {isFavorited ? (
                <MdFavorite
                  size="25"
                  className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer hover:scale-110"
                  onClick={toggleFavorite}
                />
              ) : (
                <MdFavoriteBorder
                  size="25"
                  className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer hover:scale-110"
                  onClick={toggleFavorite}
                />
              )}

              <IoMdShare
                size="25"
                className="hover:text-cyan-400 transition-colors duration-100 cursor-pointer hover:scale-110"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
