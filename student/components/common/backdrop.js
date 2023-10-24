import React from "react";

export default function Backdrop({
  className = "bg-gray-700",
  zindex = 20,
  opacity = 30,
  onClick = () => {},
}) {
  return (
    <div
      className={`fixed inset-0 z-${zindex} ${className}   bg-opacity-${opacity}`}
      onClick={onClick}
    ></div>
  );
}
