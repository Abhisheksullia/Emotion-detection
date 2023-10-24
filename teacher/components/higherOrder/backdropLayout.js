import React from "react";
import Backdrop from "../common/backdrop";

export default function BackdropLayout({ cancelPopup, children, zindex }) {
  return (
    <div onClick={cancelPopup}>
      <Backdrop opacity="60" zindex={zindex} />
      {children}
    </div>
  );
}
