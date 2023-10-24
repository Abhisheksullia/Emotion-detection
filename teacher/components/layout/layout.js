import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import MainLayout from "./mainLayout";

import { authenticate, clearStorage, url } from "../../store/actions/auth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

const authPages = [
  { path: "/dashboard", label: "Teacher Dashboard", meeting: true },
  { path: "/meeting", label: "Teacher Meeting" },
];

function Layout({ children }) {
  const dispatch = useDispatch(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter(null);
  const [expandable, setExpandable] = useState(false);

  async function checkToken(callback) {
    const token = localStorage.getItem("token");

    console.log("running", token);
    callback();

    if (!token) {
      if (!router.pathname.startsWith("/auth")) {
        await router.replace("/auth/login");
      }

      setChecking(false);
      return;
    } else {
      try {
        const response = await axios.get(`${url}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (router.pathname.startsWith("/auth")) {
          await router.replace("/dashboard");
        }
        dispatch(
          authenticate({
            token,
            isLoggedIn: true,
            user: response?.data,

            username: response.data.username,
          })
        );

        setChecking(false);
      } catch (err) {
        clearStorage();
        if (!router.pathname.startsWith("/auth")) {
          await router.replace("/auth/login");
        }

        setChecking(false);
        return;
      }
    }
  }

  useEffect(() => {
    checkToken(() => {});
  }, []);

  let body;
  const selected = authPages.find((value) =>
    router.pathname.startsWith(value.path)
  );
  if (selected) {
    body = <MainLayout selected={selected}>{children}</MainLayout>;
  } else {
    body = children;
  }
  return (
    <Fragment>
      {!checking && body}
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </Fragment>
  );
}

export default Layout;
