import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";

export const MovieCard = ({ img }: { img: string }) => {
  const width = "350px";
  const height = "550px";

  return (
    <div className="rounded-b-xl group" style={{ height: "100%" }}>
      <div
        className="rounded-xl"
        style={{
          width: width,
          height: height,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="relative p-4 opacity-100  group-hover:block group-hover:-translate-y-6 group-hover:opacity-100 transition-all duration-500 text-slate-100 rounded-b-xl"
        style={{
          maxWidth: "100%",
          maxHeight: height,
          marginTop: "-30%",
          background:
            "linear-gradient(to bottom, rgba(13, 14, 15, 0) 0%, rgba(13, 14, 15, 0.8) 10%, rgba(13, 14, 15, 1) 15%)",
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
            A group of eldery people are giving interviews about having lived in
            a climate of crop blight and constant dust reminiscent of the great
            depression of the 1930s the first one seen is an eldery woman
            stating her father was a farmer but did not start that way
          </p>
        </div>
      </div>
    </div>
  );
};
