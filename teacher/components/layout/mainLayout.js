import { useRouter } from "next/router";
import React from "react";
import DashboardIcon from "../icons/tabs/dashboard";
import LogoutIcon from "../icons/tabs/logout";
import { DashboardHeader, Logo } from "./header";
import ReportIcon from "../icons/tabs/reportIcon";
import { logout } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const options = [
  {
    Icon: DashboardIcon,
    label: "Dashboard",
    expandable: false,
    path: "/dashboard",
  },

  {
    Icon: ReportIcon,
    label: "Meetings",
    expandable: false,
    path: "/meeting",
  },
];

const bottomOptions = [{ Icon: LogoutIcon, label: "logout", logout: true }];

export default function MainLayout({ selected, children }) {
  const router = useRouter(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch(null);
  return (
    <div className="h-screen w-full flex  ">
      <div className="h-full space-y-8  w-64 flex flex-col items-center  bg-white">
        <div className="py-6 ">
          <Logo size="text-base mb-0" />
        </div>
        <div className=" w-full  flex-1 overflow-scroll no-scrollbar space-y-1.5">
          {options.map((value, index) => (
            <div className="hover:bg-gray-200">
              <div
                className={`flex w-full px-6 space-x-6 cursor-pointer py-2  items-center ${
                  router.pathname.startsWith(value.path)
                    ? "bg-secondary text-white"
                    : " bg-opacity-60"
                }`}
                onClick={() => {
                  router.push(value.path);
                }}
              >
                <value.Icon
                  className={`  w-5 h-5 ${
                    router.pathname.startsWith(value.path)
                      ? "text-white text-opacity-90"
                      : "text-unfilledColor"
                  }`}
                />
                <div className="flex space-x-4 items-center ">
                  <h1
                    className={`text-secondary font-medium  ${
                      router.pathname.startsWith(value.path)
                        ? "text-opacity-100 text-white"
                        : "text-opacity-60"
                    }`}
                  >
                    {value.label}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full space-y-6  flex flex-col justify-end pb-8 ">
          {bottomOptions.map((value, index) => (
            <div
              onClick={() => {
                if (value.logout) {
                  dispatch(logout(token));
                }
              }}
              className={`flex w-full cursor-pointer space-x-6   bg-opacity-60 px-6 items-center`}
            >
              <value.Icon className={`  w-5 h-5 text-unfilledColor `} />
              <h1
                className={`text-secondary font-medium text-base  text-opacity-60`}
              >
                {value.label}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-col  flex-1 bg-authBackground`}>
        <DashboardHeader label={selected.label} meeting={true} />
        {children}
      </div>
    </div>
  );
}
