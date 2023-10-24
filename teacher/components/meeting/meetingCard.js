import React, { useMemo } from "react";
import CheckIcon from "../icons/outline/checkIcon";
import RoundedCheckIcon from "../icons/outline/roundedCheckIcon";
import findMaxKey from "../../helpers/maxVal";
import moment from "moment";
import { MeetingStatus } from "../../enum";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../store/actions/auth";

export default function DetailMeetingCard({
  value,
  selected = false,
  cancelHandler,
  even = true,
  onClick,
}) {
  const token = useSelector((state) => state.auth.token);
  const expression = useMemo(() => {
    return value?.logs?.reduce(
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
    );
  }, [value]);
  let drowsy = findMaxKey(expression["drowsy"]);
  let emotion = findMaxKey(expression["emotion"]);

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

  async function endMeetingHandler() {
    let status = value.status;
    try {
      cancelHandler(MeetingStatus.Completed);
      const response = await axios.put(
        `${url}/end/meeting/${value.meetingLink}`,
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
      className={`grid cursor-pointer grid-cols-5 gap-6 items-center px-4 py-5 ${
        even ? "bg-gray-100 bg-opacity-60" : "bg-white"
      }`}
      onClick={onClick}
    >
      <h1 className=" place-self-center">
        {moment(value.startTime).format("DD-MM-YY hh:mm")}{" "}
      </h1>
      <h1 className=" place-self-center">{emotion ?? "None"}</h1>
      <h1 className=" place-self-center">{drowsy ?? "None"}</h1>

      <div className="flex place-self-center gap-2 items-center">
        <h1 className=" ">{value.users.length}</h1>
        {selected && <RoundedCheckIcon className="h-5 w-5" />}
      </div>
      {value.status == MeetingStatus.Completed ? (
        <h1 className=" place-self-center">
          {moment(value.endTime).format("DD-MM-YY hh:mm")}{" "}
        </h1>
      ) : (
        <div className="flex-1 flex place-self-center  text-sm">
          <h2
            onClick={(e) => {
              e.stopPropagation();
              if (value.status == MeetingStatus.Pending) {
                if (moment(value.startTime).isAfter(moment())) {
                  cancelMeetingHandler();
                } else {
                  endMeetingHandler();
                }
              }
            }}
            className={`py-1.5 bg-opacity-80  px-4 w-28 text-center bg-secondary cursor-pointer  text-white rounded-md text-sm ${
              value.status == MeetingStatus.Pending
                ? "bg-opacity-90"
                : "bg-opacity-30"
            }`}
          >
            {moment(value.startTime).isAfter(moment())
              ? value.status == MeetingStatus.Cancelled
                ? "Cancelled"
                : "Cancel"
              : "End Meet"}
          </h2>
        </div>
      )}
    </div>
  );
}
