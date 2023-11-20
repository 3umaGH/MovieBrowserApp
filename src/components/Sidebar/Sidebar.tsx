import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";

import { MdOutlineArrowForwardIos } from "react-icons/md";

// placeholder icons
import { FcDoughnutChart } from "react-icons/fc";
import { SidebarIcon } from "./SidebarIcon";
import { SidebarText } from "./SidebarText";

export const Sidebar = () => {
  const parameters = useSelector((state: RootState) => state.parameters);
  const [isCollapsed, setCollapsed] = useState(false);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const toggleCollapsed = () => setCollapsed(!isCollapsed);

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
        } opacity-50 absolute top-1/2 left-2 transition-all duration-300 cursor-pointer z-30`}
        onClick={toggleCollapsed}
      >
        <MdOutlineArrowForwardIos
          className="cursor-pointer"
          color="#474747"
          size="30"
        />
      </div>

      <div
        className=" flex flex-col text-center items-center my-2 overflow-y-auto no-scrollbar"
        {...events}
        ref={ref}
      >
        <SidebarIcon icon={<FcDoughnutChart size="40" />} tooltip="" />

        {parameters.genres.map((genre) => (
          <SidebarText
            key={genre.name}
            text={genre.name}
            tooltip={`Search ${genre.name} movies`}
          />
        ))}
      </div>
    </div>
  );
};
