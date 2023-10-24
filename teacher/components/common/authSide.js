import Image from "next/image";
import React, { Fragment } from "react";

export default function AuthSide() {
  return (
    <div className=" hidden  h-60 md:relative md:order-5 md:block md:h-full md:flex-1">
      <Image
        alt="Ca Firm"
        src={`/images/login.jpg`}
        layout="fill"
        objectFit="cover"
        className=" hidden shadow-lg"
      />
    </div>
  );
}
