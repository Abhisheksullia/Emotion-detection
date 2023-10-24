import React, { useMemo } from "react";
import CheckIcon from "../icons/outline/checkIcon";
import RoundedCheckIcon from "../icons/outline/roundedCheckIcon";
import moment from "moment";
import findMaxKey from "../../helpers/maxVal";

export default function DetailMeetingCard({
  value,
  selected = false,
  even = true,
  onClick,
}) {
  const expression = useMemo(
    () =>
      value?.logs?.reduce(
        (total, value) => {
          if (total.emotion[value.emotion]) {
            total.emotion[value.emotion] += 1;
          } else {
            total.emotion[value.emotion] = 1;
          }
          if (total.drowsy[value.drowsiness]) {
            total.drowsy[value.drowsiness] += 1;
          } else {
            total.drowsy[value.drowsiness] = 1;
          }
          return total;
        },
        { emotion: {}, drowsy: {} }
      ),
    [value]
  );
  let drowsy = findMaxKey(expression["drowsy"]);
  let emotion = findMaxKey(expression["emotion"]);
  return (
    <div
      className={`grid cursor-pointer grid-cols-6 gap-6 items-center px-4 py-5 ${
        even ? "bg-gray-100 bg-opacity-60" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="place-self-center flex flex-col items-center">
        <h1>{value?.owner?.username}</h1>
      </div>

      <h1
        className={`${
          value.present ? "text-green-500" : "text-red-500"
        }  place-self-center`}
      >
        {value.present ? "Present" : "Absent"}
      </h1>

      <h1 className="text-sm place-self-center">
        {moment(value.startTime).format("DD-MM-YY hh:mm")}{" "}
      </h1>
      <h1 className=" place-self-center">{emotion ?? "None"}</h1>
      <h1 className=" place-self-center">{drowsy ?? "None"}</h1>

      <div className="flex place-self-center gap-2 items-center">
        <h1 className=" ">{value.users.length}</h1>
        {selected && <RoundedCheckIcon className="h-5 w-5" />}
      </div>
    </div>
  );
}
