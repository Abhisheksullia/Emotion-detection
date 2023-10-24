/* This example requires Tailwind CSS v2.0+ */

import Image from "next/image";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

export function Logo({
  size = "text-lg mb-1",
  height = "h-28",
  width = "w-28",
  url,
}) {
  const router = useRouter(null);
  const token = useSelector((state) => state.auth.token);

  return (
    <div
      className="flex items-end cursor-pointer space-x-1 "
      onClick={() => {
        if (token) {
          router.push("/");
        }
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
        <h1 className="text-blue-400 text-lg font-bold ">EmoSense</h1>
      </div>
    </div>
  );
}

export function DashboardHeader({
  label = "Dashboard",
  onChange,
  dashboard = false,
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
        {dashboard && (
          <div
            onClick={() => {
              router.push("/dashboard");
            }}
            className="px-4 py-2 cursor-pointer text-white rounded-md text-sm bg-primary"
          >
            Go to Dashboard
          </div>
        )}

        <div className="flex flex-shrink-0 items-center space-x-1">
          <div className="flex space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden relative ">
              <Image
                src={
                  profileUri
                    ? `${process.env.BUCKET_URL}/${profileUri}`
                    : "/images/profile.png"
                }
                alt="Sudha consultancy"
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
