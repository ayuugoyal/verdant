import React from "react";
import Image from "next/image";

const Greetings = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/shadow-1.png')",
        backgroundSize: "cover",
      }}
    >
      <Image
        src={"/logo.png"}
        alt="logo"
        className="z-10"
        height={200}
        width={200}
      ></Image>
    </div>
  );
};

export default Greetings;
