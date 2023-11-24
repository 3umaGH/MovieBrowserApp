import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

import { useDraggable } from "react-use-draggable-scroll";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// placeholder icons
import { SidebarText } from "./SidebarText";
import { FetchQuery } from "../../common/constants";
import { AxiosResponse } from "axios";
import { MovieListApiResponse } from "../../../modules/MovieBrowser/components/MovieBrowser";
import { fetchMoviesSortBy } from "../../common/api/api";

export const Sidebar = ({
  addMovieRow,
}: {
  addMovieRow: (
    title: string,

    fetch: (
      fetchQuery: FetchQuery
    ) => Promise<AxiosResponse<MovieListApiResponse, any>>,

    fetchQuery: FetchQuery
  ) => void;
}) => {
  const parameters = useSelector((state: RootState) => state.parameters);
  const [isCollapsed, setCollapsed] = useState(true);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const toggleCollapsed = () => setCollapsed(!isCollapsed);

  const handleButtonClick = (name: string, query: FetchQuery) => {
    if (activeButtons.includes(name)) return;

    addMovieRow(`${name}`, fetchMoviesSortBy, query);
    setActiveButtons((prevArray) => [...prevArray, name]);
  };

  return (
    <div
      className={`relative flex flex-col text-center top-0 ${
        isCollapsed ? "w-0" : "w-full"
      }
       h-screen bg-primary px-2 text-white shadow-slate-800 shadow-2xl transition-all duration-500 ease-in-out`}
    >
      <div
        className="absolute flex h-screen self-end w-4 left-full top-0 shadow-inner cursor-pointer"
        onClick={toggleCollapsed}
      ></div>
      <div className="absolute flex bg-zinc-900 h-screen self-end w-1 top-0 shadow-inner"></div>

      <div
        className={`${
          isCollapsed ? "scale-100" : "scale-0"
        } opacity-80 absolute top-1/2 left-2 transition-all duration-300 cursor-pointer z-30`}
        onClick={toggleCollapsed}
      >
        <MdOutlineArrowForwardIos
          className="cursor-pointer animate-bounce-horizontal"
          color="#474747"
          size="30"
        />
      </div>

      <div
        className={`flex flex-col text-center items-center my-2 overflow-y-auto ${
          isCollapsed ? "px-0" : "px-4"
        } no-scrollbar transition-all duration-500 ease-in-out`}
        {...events}
        ref={ref}
      >
        <SidebarText
          text={"Estonian Movies"}
          tooltip={`Search Estonian movies`}
          active={activeButtons.includes("Estonian Movies")}
          onClick={() => {
            handleButtonClick("Estonian Movies", {
              sort_by: "popularity.desc",
              origin_country: "EE",
            });
          }}
        />

        <SidebarText
          text={"Russian Movies"}
          tooltip={`Search Russian movies`}
          active={activeButtons.includes("Russian Movies")}
          onClick={() => {
            handleButtonClick("Russian Movies", {
              sort_by: "popularity.desc",
              origin_country: "RU",
            });
          }}
        />

        {parameters.genres.map((genre) => (
          <SidebarText
            key={genre.name}
            text={genre.name}
            tooltip={`Search ${genre.name} movies`}
            active={activeButtons.includes(genre.name)}
            onClick={() => {
              const genreQuery = {
                sort_by: "popularity.desc",
                with_genres: `${genre.id}`,
              } as FetchQuery;

              handleButtonClick(genre.name, genreQuery);
            }}
          />
        ))}
      </div>
    </div>
  );
};
