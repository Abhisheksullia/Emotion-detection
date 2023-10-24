import React, { useState } from "react";
import EyeIcon from "../icons/outline/eyeIcon";
import EyeOffIcon from "../icons/outline/eyeOffIcon";

export default function CustomInput({
  title = false,
  label,
  maxLength,
  showError = true,
  name,
  type,
  onBlur,
  onChange,
  checkError = false,
  errors,
  touched,
  className = "bg-white border-1px border-black border-opacity-5",
  value,
}) {
  const [inputType, setInputType] = useState(type);
  let body;
  if (type == "password") {
    body = (
      <div
        className={` h-14 w-full  rounded-md flex  overflow-hidden     text-lg bg-white text-gray-500  ${className}`}
      >
        <input
          type={inputType}
          maxLength={maxLength}
          spellCheck={false}
          name={name}
          className={` h-full  w-full  border-none px-2  text-lg bg-white text-gray-500   placeholder:text-base placeholder:text-black placeholder:text-opacity-60  focus:outline-none `}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={label}
          value={value}
        />
        {inputType == "text" ? (
          <div
            className="px-4 flex items-center"
            onClick={() => setInputType("password")}
          >
            <EyeOffIcon className=" h-5 w-5 text-gray-500" />
          </div>
        ) : (
          <div
            className="px-4 flex items-center"
            onClick={() => setInputType("text")}
          >
            <EyeIcon className=" h-5 w-5 text-gray-500" />
          </div>
        )}
      </div>
    );
  } else {
    body = (
      <input
        type={type}
        maxLength={maxLength}
        spellCheck={false}
        name={name}
        className={` h-14 w-full  rounded-md px-2  text-lg bg-white text-gray-500   placeholder:text-base placeholder:text-black placeholder:text-opacity-60  focus:outline-none ${className}`}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={label}
        value={value}
      />
    );
  }
  console.log(checkError && errors[name]);

  return (
    <div className="flex-1 ">
      {title && <div className="mb-0.5 ml-1 text-lg">{label}</div>}
      {body}
      {errors[name] && touched[name] && showError && (
        <h2 className="ml-1 text-start text-sm  font-light text-red-400">
          {errors[name]}
        </h2>
      )}
    </div>
  );
}
