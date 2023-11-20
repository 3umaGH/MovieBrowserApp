import { useState } from "react";

export const SidebarText = ({
  text,
  tooltip,
}: {
  text: String;
  tooltip?: String;
}) => {
  const [iconY, setIconY] = useState(0);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    setIconY(rect.top + rect.height / 2);
  };

  return (
    <>
      <div className="sidebar-icon group" onMouseEnter={handleMouseEnter}>
        {tooltip && (
          <span
            style={{ top: iconY - 25 }}
            className="sidebar-tooltip group-hover:scale-100"
          >
            {tooltip + " 💡"}
          </span>
        )}
        {text}
      </div>
    </>
  );
};
