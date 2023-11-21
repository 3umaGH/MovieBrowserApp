export const Spinner = ({ size = 48 }) => {
  return (
    <div
      className={`border-gray-300 opacity-50
       animate-spin rounded-full border-t-gray-400`}
      style={{ borderWidth: "8px", width: `${size}rem`, height: `${size}rem` }}
    />
  );
};
