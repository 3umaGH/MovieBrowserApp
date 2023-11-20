import { MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export const DetailsActionsComponent = () => {
  return (
    <div className="flex items-center justify-between flex-wrap mb-1 mx-auto gap-8 text-white">
      <button className="details-action-button">
        <FaStar size={26} />
      </button>
      <button className="details-action-button">
        <MdFavorite size={26} />
      </button>
    </div>
  );
};
