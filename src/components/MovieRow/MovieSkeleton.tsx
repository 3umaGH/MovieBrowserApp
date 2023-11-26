export const MovieSkeleton = () => {
  return (
    <div
      role="status"
      className="bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      style={{ minWidth: "20rem" }}
    >
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      ></svg>
    </div>
  );
};
