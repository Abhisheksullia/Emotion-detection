import React from "react";
import CustomButton from "./customButton";

export function OtpInput({ name, refs, onChange, size = 14 }) {
  return (
    <div
      className={`h-${size} w-${size} md:w-16 md:h-16 overflow-hidden rounded-md bg-white `}
    >
      <input
        type="number"
        name={name}
        className="focus:outline-none h-full w-full rounded-md border border-gray-400 bg-transparent p-2 text-center text-lg font-semibold text-primary focus:bg-gray-200  focus:bg-opacity-40"
        ref={refs}
        onChange={onChange}
      />
    </div>
  );
}

export default function OtpVerification({
  firstRef,
  secondRef,
  isSubmitting,
  thirdRef,
  fourthRef,
  onChangeEvent,
  margin = "mb-16",
  verifyHandler = () => {},
}) {
  const onSubmit = async () => {
    if (
      firstRef.current.value &&
      secondRef.current.value &&
      thirdRef.current.value &&
      fourthRef.current.value
    ) {
      let value = `${firstRef.current.value}${secondRef.current.value}${thirdRef.current.value}${fourthRef.current.value}`;

      await verifyHandler(value);
    } else if (!firstRef.current.value) {
      firstRef.current.focus();
    } else if (!secondRef.current.value) {
      secondRef.current.focus();
    } else if (!thirdRef.current.value) {
      thirdRef.current.focus();
    } else {
      fourthRef.current.focus();
    }
  };
  return (
    <div className="space-y-4">
      <div
        className={`flex justify-between  space-x-3  md:justify-center  md:space-x-12 ${margin}`}
      >
        <OtpInput
          name="1"
          refs={firstRef}
          onChange={(e) => {
            onChangeEvent(e, secondRef);
          }}
        />
        <OtpInput
          name="2"
          refs={secondRef}
          onChange={(e) => {
            onChangeEvent(e, thirdRef);
          }}
        />
        <OtpInput
          name="3"
          refs={thirdRef}
          onChange={(e) => {
            onChangeEvent(e, fourthRef);
          }}
        />
        <OtpInput
          name="4"
          refs={fourthRef}
          onChange={(e) => {
            onChangeEvent(e, fourthRef, true);
          }}
        />
      </div>
      <button
        className=" mt-8 flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className=" flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        ) : (
          "Proceed"
        )}
      </button>
    </div>
  );
}
