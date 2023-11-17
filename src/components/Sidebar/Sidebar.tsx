import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { useState } from "react";

import { MdOutlineArrowForwardIos } from "react-icons/md";

// placeholder icons
import { FcDoughnutChart } from "react-icons/fc";
import { BsAndroid } from "react-icons/bs";
import { FcVip } from "react-icons/fc";
import { SidebarIcon } from "./SidebarIcon";
import { FcInfo } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcPrint } from "react-icons/fc";
import { FcUnlock } from "react-icons/fc";

export const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`relative flex flex-col text-center top-0 w-${
        isCollapsed ? "0" : "28"
      } h-screen bg-primary text-white shadow-slate-800 shadow-2xl transition-all duration-500 ease-in-out`}
    >
      <div
        className="absolute flex h-screen self-end w-4 left-full top-0 shadow-inner cursor-pointer"
        onClick={toggleCollapsed}
      ></div>
      <div className="absolute flex bg-zinc-900 h-screen self-end w-1 top-0 shadow-inner"></div>

      <div
        className={`scale-${
          isCollapsed ? "100" : "0"
        } opacity-50 relative top-1/2 left-2 transition-all duration-300 cursor-pointer`}
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
        <SidebarIcon
          icon={<FcDoughnutChart size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<BsAndroid color="green" size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcInfo size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcCustomerSupport size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon
          icon={<FcCollaboration size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon icon={<FcPrint size="40" />} tooltip="piska small 32" />
        <SidebarIcon icon={<FcUnlock size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<BsAndroid color="green" size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcInfo size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcCustomerSupport size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon
          icon={<FcCollaboration size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon icon={<FcPrint size="40" />} tooltip="piska small 32" />
        <SidebarIcon icon={<FcUnlock size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<BsAndroid color="green" size="40" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcInfo size="40" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcCustomerSupport size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon
          icon={<FcCollaboration size="40" />}
          tooltip="piska small 32"
        />
        <SidebarIcon icon={<FcPrint size="40" />} tooltip="piska small 32" />
        <SidebarIcon icon={<FcUnlock size="40" />} tooltip="piska small 32" />
      </div>
    </div>
  );
};
