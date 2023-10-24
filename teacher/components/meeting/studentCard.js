import Image from "next/image";
import React, { useMemo } from "react";
import findMaxKey from "../../helpers/maxVal";

export function ProfileCard({ subtitle = "Student", title }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-10 h-10 rounded-full   overflow-hidden relative ">
        <Image
          src={"/images/profile.png"}
          alt="Online Emotion Meet"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex-1 leading-5">
        <h1 className="capitalize">{title}</h1>
        <h1 className="text-gray-400 ">{subtitle}</h1>
      </div>
    </div>
  );
}

export default function StudentCard({ onClick, value }) {
  console.log("result", value.logs);
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
  console.log("expore", expression);
  let drowsy = findMaxKey(expression["drowsy"]);
  let emotion = findMaxKey(expression["emotion"]);
  return (
    <div
      onClick={onClick}
      className="px-4 cursor-pointer flex flex-col justify-between rounded-md  pb-4 pt-2 border-1px border-gray-200 bg-gray-100"
    >
      <ProfileCard title={value.username} />
      <div className=" mt-6 flex gap-6">
        <div className="flex text-sm items-center gap-1">
          <h1 className="text-red-400">Emotion:</h1>
          <h1 className="uppercase">{emotion}</h1>
        </div>
        <div className="flex text-sm items-center gap-1">
          <h1 className="text-red-400">Drowsiness:</h1>
          <h1 className="uppercase">{drowsy}</h1>
        </div>
      </div>
    </div>
  );
}
