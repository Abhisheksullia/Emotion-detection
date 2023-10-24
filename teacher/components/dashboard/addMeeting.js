import React, { Fragment, useState } from "react";
import { MeetingStatus, MeetingType } from "../../enum";
import Backdrop from "../common/backdrop";
import LoaderRelative from "../common/loader";
import { Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import moment from "moment";
import { toast } from "react-toastify";
import { url } from "../../store/actions/auth";
import { dashboardActions } from "../../store/reducers/dashboard";

export default function AddMeetingPopup({ cancelPopup, type, successHandler }) {
  const token = useSelector((state) => state.auth.token);
  const { isLoading, error, sendRequest: meetingApi, setError } = useHttp();
  const dispatch = useDispatch(null);
  return (
    <Formik
      initialValues={{
        comment: undefined,
        date: undefined,
        time: undefined,
      }}
      onSubmit={async (values, { setSubmitting, validateForm }) => {
        try {
          await validateForm(values);
          if (type == MeetingType.Schedule) {
            if (!values.time || !values.date) {
              toast.error("please select date and time");
              return;
            }
          }
          const time = values?.time?.split(":");
          const formatDate =
            type == MeetingType.Instant
              ? moment().toDate()
              : moment(values?.date)
                  .startOf("day")
                  .add(time?.[0], "hours")
                  .add(time?.[1], "minutes")
                  .toDate();

          await meetingApi(
            {
              url: `${url}/create/meeting`,
              body: {
                startTime: formatDate,
                title: values.comment,
              },
              headers: { Authorization: `Bearer ${token}` },

              method: "POST",
            },
            (data) => {
              if (moment(formatDate).add(10, "minute").isAfter(moment())) {
                dispatch(
                  dashboardActions.addMeeting({
                    meetingLink: data.link,
                    status: MeetingStatus.Pending,
                    startTime: formatDate,
                    title: values.comment,
                  })
                );
              }
              successHandler(`http://localhost:3000/${data.link}`);
              toast.success(
                `Meeting at ${moment(formatDate).format(
                  "DD:MM:YYYY HH:mm"
                )} is successfully created`
              );
            }
          );
        } catch (err) {
          console.log("error from catch", err, err?.response?.data?.message);

          setError(err?.response?.data?.message ?? "Something went Wrong");
        }
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <div onClick={cancelPopup}>
          <Backdrop opacity="60" />
          <div
            className="fixed  text-base w-2/5 max-w-xl flex flex-col justify-between px-8 py-6 text-secondary rounded-lg  z-50  h-3/4 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white border-black border-opacity-60 border-1px"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className={` overflow-hidden "flex-1 opacity-100" duration-200 transition-all  flex flex-col `}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">
                  {MeetingType.Instant == type
                    ? "Create instant meeting"
                    : "Schedule Meeting"}
                </h1>
              </div>

              <div className="grid  gap-6 gap-y-8 mt-10">
                {MeetingType.Schedule == type && (
                  <Fragment>
                    <div className="  space-y-2 items-center flex gap-6  ">
                      <h1 className="text-gray-400 ml-2 ">Choose Date:</h1>
                      <input
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        className="flex-1 focus:outline-none bg-gray-100 text-gray-600 px-2 py-2 rounded-md "
                      />
                    </div>
                    <div className=" space-y-2 items-center flex gap-6  ">
                      <h1 className="text-gray-400 ml-2 ">Choose Time:</h1>
                      <input
                        type="time"
                        name="time"
                        value={values.time}
                        onChange={handleChange}
                        className="flex-1 focus:outline-none bg-gray-100 text-gray-600 px-2 py-2 rounded-md "
                      />
                    </div>
                  </Fragment>
                )}

                <div className=" space-y-2 items-center flex gap-6  ">
                  <h1 className="text-gray-400 ml-2 ">Add Comment:</h1>
                  <textarea
                    name="comment"
                    placeholder="Enter comment here"
                    value={values.comment}
                    onChange={handleChange}
                    className="flex-1 focus:outline-none bg-gray-100 text-gray-600 px-2 py-2 rounded-md "
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 ">
              <div
                className="border-1px cursor-pointer border-primary text-secondary py-1.5 text-center rounded-md"
                onClick={cancelPopup}
              >
                Cancel
              </div>
              <div
                className="bg-primary py-1.5 cursor-pointer text-center text-white font-semibold rounded-md"
                onClick={isSubmitting ? () => {} : handleSubmit}
              >
                {isSubmitting ? <LoaderRelative /> : "Create Meeting"}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
