"use client";
import React from "react";
import Image from "next/image";
import Dropwdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";

const Main = () => {
  const [selected, setSelected] = React.useState("");
  const [currentQues, setCurrentQues] = React.useState(0);
  return (
    <div
      className="flex flex-col justify-center items-center h-screen text-[#395886]"
      style={{
        backgroundImage: "url('/questions.png')",
        backgroundSize: "cover",
      }}
    >
      <Image src="/logo.png" width={100} className="" height={100} alt="logo" />
      {currentQues === 0 && (
        <>
          <h1 className="text-2xl mt-8 font-bold">What’s your Hustle?</h1>
          <Dropwdown
            onChange={(item) => {
              console.log("onChange");
              setSelected(item);
            }}
          />
        </>
      )}
      {currentQues === 1 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">
            When’s your moment to break free?
          </h1>
          <input type="time" className="text-2xl mt-8 font-bold" />
        </>
      )}
      {currentQues === 2 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">Days off?</h1>
        </>
      )}
      {currentQues === 3 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">
            What’s your Hustle?
          </h1>
        </>
      )}
      <div className="flex gap-4 mt-5">
        {currentQues != 0 && (
          <Button
            onClick={() => {
              setCurrentQues((prev) => prev - 1);
            }}
            className="mt-4 bg-[#395886] text-white px-4 py-2"
          >
            Prev
          </Button>
        )}
        {currentQues != 3 && (
          <Button
            onClick={() => {
              setCurrentQues((prev) => prev + 1);
            }}
            className="mt-4 bg-[#395886] text-white px-4 py-2"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Main;
