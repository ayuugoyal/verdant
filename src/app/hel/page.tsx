import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F0F3FA]">
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
};

export default page;
