import React from "react";

const TourBackground = ({ title }) => {
  return (
    <div
      className="h-[340px]"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/Asset/background.jpg') no-repeat center center",
      }}
    >
      <div className="h-full flex justify-center items-center">
        <h1 className="text-white text-5xl ">{title}</h1>
      </div>
    </div>
  );
};

export default TourBackground;
