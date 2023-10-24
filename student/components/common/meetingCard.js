import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { MeetingStatus } from "../../enum";
import { toast } from "react-toastify";

export default function MeetingCard({ value }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter(null);
  return (
    <div
      onClick={() => {}}
      className="px-4 cursor-pointer flex flex-col justify-between rounded-md  pb-4 pt-2 border-1px border-gray-200 bg-gray-100"
    >
      <div className="flex-1 leading-5">
        <h1 className="capitalize">{value?.owner?.username}</h1>
        <h1 className="text-gray-400 ">Teacher</h1>
      </div>

      <h1 className="text-gray-600 mt-6 flex-1 ">
        {value?.title ?? "No Comment "}
      </h1>
      <div className="mt-4 flex items-center ">
        <div className="flex-1 flex">
          <h2
            onClick={(e) => {
              e.stopPropagation();
              if (value.status == MeetingStatus.Pending) {
                if (
                  moment().add(2, "minutes").isAfter(moment(value.startTime))
                ) {
                  router.push(`/${value.meetingLink}`);
                } else {
                  // router.push(`/${value.meetingLink}`);
                  toast.error("you can only join meeting before 2 mins");
                }
              } else {
                toast.error("This meeting is cancelled by teacher");
              }
            }}
            className={`py-1.5 ${
              value.status == MeetingStatus.Pending &&
              moment().add(2, "minutes").isAfter(moment(value.startTime))
                ? "bg-opacity-80"
                : "bg-opacity-40"
            }  px-4 bg-secondary cursor-pointer  text-white rounded-md text-sm`}
          >
            {value.status == MeetingStatus.Pending ? "Join now" : value.status}
          </h2>
        </div>
        <div className="text-gray-600">
          <h1>{moment(value?.startTime).format("DD/MM/YYYY HH:mm")}</h1>
        </div>
      </div>
    </div>
  );
}
