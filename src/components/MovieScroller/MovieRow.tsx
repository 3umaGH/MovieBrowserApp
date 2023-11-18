import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

export const MovieRow = ({ children }: { children: React.ReactNode }) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div
      {...events}
      ref={ref}
      className="flex gap-14 m-2 mt-8 overflow-x-auto overflow-y-clip no-scrollbar h-min"
    >
      {children}
    </div>
  );
};
