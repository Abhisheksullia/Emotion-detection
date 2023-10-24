import React from "react";

export default function Title({
  label = "",
  cols = 1,
  style = "text-base",
  onClick,
  className,
}) {
  return (
    <h3
      className={`text-gray-500  text-ellipsis truncate ${style} col-span-${cols} ${className}`}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {label}
    </h3>
  );
}
