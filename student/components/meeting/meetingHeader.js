import React from "react";
import Title from "../common/title";

export default function MeetingHeader() {
  return (
    <div className="grid px-4 grid-cols-6 gap-6  py-4 ">
      <Title label="Created By" className=" place-self-center" />
      <Title label="Status" className=" place-self-center" />
      <Title label="Date" className=" place-self-center" />
      <Title label="Emotion" className=" place-self-center" />
      <Title label="Drowsiness" className=" place-self-center" />
      <Title label="Participant No." className=" place-self-center" />
    </div>
  );
}
