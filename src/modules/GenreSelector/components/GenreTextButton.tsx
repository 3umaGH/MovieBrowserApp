import { useState } from "react";

export const GenreTextButton = ({
  text,
  tooltip,
  onClick,
  active = false,
}: {
  text: String;
  tooltip?: String;
  onClick?: () => void;
  active?: boolean;
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
        className={`sidebar-icon group ${active ? "active" : ""}`}
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
        {text}
      </div>
    </>
  );
};
