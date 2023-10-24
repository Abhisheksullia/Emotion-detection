import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { url } from "../../store/actions/auth";
import { MeetingStatus } from "../../enum";
import { toast } from "react-toastify";

export default function MeetingCard({ value, cancelHandler }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter(null);
  const token = useSelector((state) => state.auth.token);
  async function cancelMeetingHandler() {
    let status = value.status;
    try {
      cancelHandler(MeetingStatus.Cancelled);
      const response = await axios.put(
        `${url}/cancel/meeting/${value.meetingLink}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      cancelHandler(status);
      console.log("error", err);
    }
  }
  return (
    <div
      onClick={() => {}}
      className="px-4 cursor-pointer flex flex-col justify-between rounded-md  pb-4 pt-2 border-1px border-gray-200 bg-gray-100"
    >
      <div className="flex-1 leading-5">
        <h1 className="capitalize">{user?.username}</h1>
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
                cancelMeetingHandler();
              } else {
                toast.error(
                  "This meeting is either completed or cancelled already"
                );
              }
            }}
            className={`py-1.5 bg-opacity-80  px-4 bg-secondary cursor-pointer  text-white rounded-md text-sm ${
              value.status == MeetingStatus.Pending
                ? "bg-opacity-80"
                : "bg-opacity-40"
            }`}
          >
            {value.status == MeetingStatus.Pending ? "Cancel" : value.status}
          </h2>
        </div>
        <div className="text-gray-600">
          <h1>{moment(value?.startTime).format("DD/MM/YYYY HH:mm")}</h1>
        </div>
      </div>
    </div>
  );
}
