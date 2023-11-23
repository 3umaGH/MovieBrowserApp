import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

export const MovieScore = ({
  score,
  totalVotes,
}: {
  score: number;
  totalVotes: number;
}) => {
  return (
    <div
      className="w-full h-full rounded-full p-1"
      style={{ backgroundColor: "#081C22" }}
    >
      <CircularProgressbarWithChildren
        value={score}
        maxValue={10}
        styles={buildStyles({
          pathColor:
            score >= 7
              ? "#21D07A" // Green
              : score >= 5
              ? "#F5A623" // Orange
              : "#DB2360", // Red
          trailColor:
            score >= 7
              ? "#204529" // Green
              : score >= 5
              ? "#6b480d" // Orange
              : "#571435", // Red
          textColor: "#242424",
          textSize: "24px",
        })}
      >
        <span
          className="font-roboto font-semibold text-center  cursor-default"
          style={{ fontSize: 29 }}
        >
          {((score / 10) * 100).toFixed(0)}
          <span
            className=" font-roboto align-text-top cursor-default"
            style={{ fontSize: 14 }}
          >
            %
          </span>
        </span>
        <span className=" text-xs -mt-2">{totalVotes} Rts</span>
      </CircularProgressbarWithChildren>
    </div>
  );
};
