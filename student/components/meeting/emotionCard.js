import moment from "moment";
import React from "react";

export default function EmotionCard({ value }) {
  return (
    <div
      onClick={() => {}}
      className="px-4 cursor-pointer flex flex-col justify-between rounded-md  pb-4 pt-2 border-1px border-gray-200 bg-gray-100"
    >
      <div className="flex gap-4">
        <h1>Time:-</h1>
        <h1>{moment(value.createdAt).format("DD-MM-YY hh:mm:ss a")}</h1>
      </div>
      <div className="flex gap-4">
        <h1 className="text-red-400">Emotion:</h1>
        <h1>{value.emotion}</h1>
      </div>
      <div className="flex gap-4">
        <h1 className="text-red-400">Drowsiness:</h1>
        <h1>{value.drowsiness}</h1>
      </div>
    </div>
  );
}
