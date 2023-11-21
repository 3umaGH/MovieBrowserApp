import { useState } from "react";

export const SidebarIcon = ({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip?: String;
  onClick?: () => void;
}) => {
  const [iconY, setIconY] = useState(0);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    setIconY(rect.top + rect.height / 2);
  };

  return (
    <>
      <div
        className="sidebar-icon group"
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
      >
        {tooltip && (
          <span
            style={{ top: iconY - 25 }}
            className="sidebar-tooltip group-hover:scale-100"
          >
            {tooltip + " 💡"}
          </span>
        )}
        {icon}
      </div>
    </>
  );
};
