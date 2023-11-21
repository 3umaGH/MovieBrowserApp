import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api/api";
import { MovieDetails } from "../../constants";

import "react-circular-progressbar/dist/styles.css";
import { MovieDetailsSection } from "../MovieDetailsSection/MovieDetailsSection";

import { IoMdClose } from "react-icons/io";
import { Spinner } from "../Spinner";

export const MovieDetailsPopup = ({
  movieID,
  onClose,
}: {
  movieID: number;
  onClose: () => void;
}) => {
  const [movie, setMovieData] = useState<MovieDetails>();
  const [activeTrailerID, setActiveTrailerID] = useState<string>();

  useEffect(() => {
    fetchMovieDetails(`${movieID}`).then((response) => {
      setMovieData(response.data as MovieDetails);
    });
  }, []);

  const handleSetTrailerCallback = (id: string) => {
    setActiveTrailerID(id);
  };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-screen h-screen bg-black opacity-50 z-20"
        onClick={
          activeTrailerID
            ? () => setActiveTrailerID(undefined)
            : () => onClose()
        } // On close, if user is viewing trailer then close the trailer, else close popup.
      ></div>
    );
  };

  return (
    <>
      <Backdrop />

      {movie ? (
        <div
          className="absolute top-1/2 left-1/2 overflow-auto w-screen h-screen lg:h-auto my-auto z-20"
          style={{
            transform: "translate(-50%, -50%)",
            maxWidth: "1600px",
          }}
        >
          <div className="absolute top-5 right-0 z-20 hover:scale-150 active:scale-125 transition-transform mx-5 cursor-pointer">
            <IoMdClose
              color="white"
              size={30}
              onClick={
                activeTrailerID
                  ? () => setActiveTrailerID(undefined)
                  : () => onClose()
              } // On close, if user is viewing trailer then close the trailer, else close popup.
            />
          </div>
          <div className="p-4 md:p-14 lg:p-4 rounded-3xl">
            {activeTrailerID ? (
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${activeTrailerID}?autoplay=1`}
                  title=""
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  width="100%"
                  style={{ height: "80vh" }}
                ></iframe>
              </div>
            ) : (
              <MovieDetailsSection
                movieData={movie as MovieDetails}
                setTrailerCallback={handleSetTrailerCallback}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          onClick={onClose}
        >
          <Spinner size={10} />
        </div>
      )}
    </>
  );
};
