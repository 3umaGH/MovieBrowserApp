import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export const MovieRow = ({
  title,
  children,
}: {
  title: String;
  children: React.ReactNode;
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <>
      <div className="mt-8">
        <hr className=" mx-auto my-8 w-1/2  text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

        <h2 className="text-center font-sans text-5xl text-stone-200">
          {title}
        </h2>
        <hr className=" mx-auto my-8 w-1/2  text-center h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      </div>
      <div
        {...events}
        ref={ref}
        className="flex gap-4 m-2 mt-8 overflow-x-scroll no-scrollbar"
      >
        {children}
      </div>
    </>
  );
};
