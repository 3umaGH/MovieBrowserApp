import { FcDoughnutChart } from "react-icons/fc";
import { FcVip } from "react-icons/fc";
import { SidebarIcon } from "./SidebarIcon";

export const Sidebar = () => {
  return (
    <div className="relative flex flex-col text-center top-0 w-32 h-screen bg-primary text-white shadow-md">
      <div className=" flex flex-col text-center items-center my-2 overflow-y-auto no-scrollbar">
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
        <SidebarIcon
          icon={<FcDoughnutChart size="48" />}
          tooltip="Piska popka 123"
        />
        <SidebarIcon icon={<FcVip size="48" />} tooltip="piska small 32" />
      </div>
    </div>
  );
};
