import { useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";

import { IoMdShare } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

export const MovieCard = ({ img }: { img: string }) => {
  const [isFavorited, setFavorited] = useState(false);

  const toggleFavorite = () => setFavorited(!isFavorited);

  return (
    <div className="rounded-b-xl group" style={{ height: "500px" }}>
      <div
        className="relative rounded-xl w-80 h-4/5"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div style={{height:"0px"}}>
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
            <h4 className="font-mono text-4xl text-left">The Batman</h4>

            <p className="font-extralight ml-0.5 text-stone-300">
              PG-13 / 2h 49min / Adventure, Drama, Sci-Fi
            </p>

            <div className="flex justify-between mt-3 ">
              <span className="font-medium">Summary</span>

              <div className="flex items-center">
                <p className="mr-1 font-thin">4.5</p>
                <MdOutlineStarPurple500 color="gold" />
              </div>
            </div>

            <p className="mt-3 font-extralight text-sm">
              A group of eldery people are giving interviews about having lived
              in a climate of crop blight and constant dust reminiscent of the
              great depression of the 1930s the first one seen is an eldery
              woman stating her father was a farmer but did not start that way
            </p>

            <div className="flex justify-between items-center mt-4">
              <button className="flex items-center border-cyan-950 border-2 py-1 px-2 text-cyan-600 hover:bg-cyan-800 hover:text-cyan-50 transition-colors duration-300 cursor-pointer">
                <IoMdPlay className="mr-1" />
                Watch Trailer
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
    </div>
  );
};
