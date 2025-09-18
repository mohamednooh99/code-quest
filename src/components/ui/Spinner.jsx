import React from "react";

const Spinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}
      ></div>
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );
};

export default Spinner;
