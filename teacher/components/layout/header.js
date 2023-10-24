/* This example requires Tailwind CSS v2.0+ */

import Image from "next/image";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import MeetingIcon from "../icons/outline/meeting";
import { Fragment, useState } from "react";
import BackdropLayout from "../higherOrder/backdropLayout";
import PlusIcon from "../icons/outline/plusIcon";
import ClockIcon from "../icons/outline/clockIcon";
import AddMeetingPopup from "../dashboard/addMeeting";
import { MeetingType } from "../../enum";
import CopyIcon from "../icons/outline/copyIcon";
import { toast } from "react-toastify";

export function Logo({
  size = "text-lg mb-1",
  height = "h-28",
  width = "w-28",
  url,
}) {
  const router = useRouter(null);

  return (
    <div
      className="flex items-end cursor-pointer space-x-1 "
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="flex items-center">
        <div
          className={`relative ${height} ${width}  flex  flex-grow  justify-center overflow-hidden sm:flex-grow-0  md:flex-grow-0 `}
        >
          <Image
            src={url ? `${process.env.BUCKET_URL}/${url}` : "/images/logo.jpeg"}
            alt="Sudha consultancy"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h1 className="text-blue-400 text-lg font-bold">EmoSense</h1>
      </div>
    </div>
  );
}
function OptionCard({
  Icon = PlusIcon,
  label = "Schedule a Meeting",
  onClick,
}) {
  return (
    <div onClick={onClick} className="flex  gap-4 items-center">
      <Icon className="h-5 w-5" />
      <h1>{label}</h1>
    </div>
  );
}

function AddMeeting() {
  const [add, setAdd] = useState(false);
  const [link, setLink] = useState(null);
  const [meetingType, setMeetingType] = useState(null);
  return (
    <Fragment>
      <div
        onClick={() => {
          setAdd(true);
          // router.push("/dashboard");
        }}
        className="px-4 relative items-center flex gap-2 py-2 cursor-pointer text-white rounded-md text-sm bg-primary"
      >
        <MeetingIcon className="w-4 h-4" />
        <h1>New Meeting</h1>
        {add && (
          <BackdropLayout
            cancelPopup={(e) => {
              e.stopPropagation();
              setAdd(false);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-60 absolute space-y-5 text-gray-600 bg-white top-0 z-40 py-6 right-0 p-4 shadow-sm "
            >
              <OptionCard
                onClick={(e) => {
                  e.stopPropagation();
                  setMeetingType(MeetingType.Schedule);
                  setAdd(false);
                }}
                Icon={ClockIcon}
                label="Create a meeting for later"
              />
              <OptionCard
                onClick={(e) => {
                  e.stopPropagation();
                  setMeetingType(MeetingType.Instant);
                  setAdd(false);
                }}
                Icon={PlusIcon}
                label="Start an instant meeting"
              />
            </div>
          </BackdropLayout>
        )}
        {meetingType && (
          <AddMeetingPopup
            cancelPopup={(e) => {
              e.stopPropagation();
              setAdd(false);
              setMeetingType(null);
            }}
            successHandler={(value) => {
              setLink(value);
              setMeetingType(null);
            }}
            type={meetingType}
          />
        )}
        {link && (
          <BackdropLayout
            cancelPopup={(e) => {
              e.stopPropagation();
              setAdd(false);
              setMeetingType(null);
              setLink(null);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="popupClass px-8 py-6 pb-8 max-w-sm  bg-white rounded-md"
            >
              <div className="space-y-4">
                <h2 className="text-lg ">Here is the link to your meeting</h2>
                <h2 className="font-light text-gray-500">
                  Copy the link and send it to the people you want to meet with.
                  Make sure you have save it so that you can use it later
                </h2>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    toast.success(
                      "Meeting link successfully copied to clipboard"
                    );
                  }}
                  className="px-3 items-center rounded-md text-opacity-80 text-primaryText flex gap-2 py-2 bg-gray-100 w-full"
                >
                  <h1 className="flex-1 ">{link}</h1>
                  <CopyIcon />
                </div>
              </div>
            </div>
          </BackdropLayout>
        )}
      </div>
    </Fragment>
  );
}

export function DashboardHeader({
  label = "Dashboard",
  onChange,
  dashboard = false,
  meeting = false,
}) {
  const profileUri = useSelector((state) => state.auth.profileUri);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  return (
    <header
      className={` flex w-full items-center  bg-white max-w-monitor mx-auto  justify-between px-4 py-6 self-start border-l-1px border-gray-200 `}
    >
      <h1 className="text-xl capitalize  font-semibold text-secondary text-opacity-80">
        {label}
      </h1>
      {onChange ? (
        <input
          placeholder=" search task"
          onChange={onChange}
          className=" bg-gray-100 flex-1 focus:outline-none focus:bg-primary focus:bg-opacity-20 ml-6 mr-6 h-10  rounded-md px-4 text-gray-500 flex items-center  "
        />
      ) : (
        <div className="flex-1"></div>
      )}

      <nav className="  gap-8  justify-end items-start text-xl font-medium  flex">
        {meeting && <AddMeeting />}

        <div className="flex flex-shrink-0 items-center space-x-1">
          <div className="flex space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden relative ">
              <Image
                src={
                  profileUri
                    ? `${process.env.BUCKET_URL}/${profileUri}`
                    : "/images/profile.png"
                }
                alt="EmoSense"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="flex  space-x-1 items-center">
              <h2 className="text-base capitalize font-semibold text-secondary text-opacity-70">
                {user?.username ?? "No User"}
              </h2>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
