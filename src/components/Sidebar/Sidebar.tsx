import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

// Icons
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
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div className="relative flex flex-col text-center top-0 w-32 h-screen bg-primary text-white shadow-md">
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
