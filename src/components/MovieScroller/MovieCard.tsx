import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";

import { IoMdShare } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { CDN_PATH, Movie } from "../../constants";
import { RootState } from "../../app/Store";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const parameters = useSelector((state: RootState) => state.parameters);
  const [isFavorited, setFavorited] = useState(false);

  const toggleFavorite = () => setFavorited(!isFavorited);

  const matchGenreByID = (id: Number) => {
   return parameters.genres.find((genre) => genre.id == id)?.name || ""
  };

  return (
    <div className="rounded-b-xl group py-1" style={{ height: "66vh" }}>
      <div
        className="relative rounded-xl w-80 h-4/5"
        style={{
          backgroundImage: `url(${CDN_PATH + movie.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div
        className="p-4 opacity-0 -translate-y-16 h-fit group-hover:translate-y-16 group-hover:opacity-100 transition-all duration-500 text-slate-100 rounded-b-xl"
        style={{
          maxWidth: "100%",
          marginTop: "-100%",
          background:
            "linear-gradient(to bottom, rgba(13, 14, 15, 0) 0%, rgba(13, 14, 15, 0.8) 10%, rgba(13, 14, 15, 0.8) 15%)",
        }}
      >
        <div className="mt-5">
          <h4 className="font-mono text-2xl text-left">{movie.title}</h4>

          <p className="font-extralight ml-0.5 text-stone-300 text-sm">
            {!parameters.loading && movie.genre_ids.map((genreID, index, array) => (
                <span className="mr-0" key={genreID}>{matchGenreByID(genreID)}{array.length -1 === index ? "." : ", "}</span>
            ))}
            {/*PG-13 / 2h 49min / Adventure, Drama, Sci-Fi*/}
          </p>

          <div className="flex justify-between mt-3 ">
            <span className="font-medium">Summary</span>

            <div className="flex items-center">
              <p className="mr-1 font-thin">{movie.vote_average}/10</p>
              <MdOutlineStarPurple500 color="gold" />
            </div>
          </div>

          <p className="mt-3 font-extralight text-sm">{movie.overview}</p>

          <div className="flex justify-between items-center mt-4">
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
      </div>
    </div>
  );
};
