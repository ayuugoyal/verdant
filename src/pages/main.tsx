"use client";
import React from "react";
import Image from "next/image";
import Dropwdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Radio from "@/components/Radio";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { OpenAiResponse, Question, User } from "@/db/schema";
import { add_questions } from "@/actions/questions";

const Main = () => {
  const [ans1, setAns1] = React.useState<string>("");
  const [ans2, setAns2] = React.useState<string>("");
  const [ans3, setAns3] = React.useState<string[]>([]);
  const [ans4, setAns4] = React.useState({ name: "" });
  const [currentQues, setCurrentQues] = React.useState(0);

  const userDetails: User =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const days = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  const handleclick = async () => {
    try {
      const finalprop = {
        user_id: userDetails.id,
        question1: ans1,
        question2: ans2,
        question3: JSON.stringify(ans3),
        question4: ans4?.name,
      };
      console.log(finalprop);
      const feedQuestion: OpenAiResponse = await add_questions(
        finalprop as Question
      );
      console.log(feedQuestion);
      if (feedQuestion) {
        window.localStorage.setItem("question", JSON.stringify(feedQuestion));
        window.location.href = `/mainApp/${feedQuestion.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              setAns1(item);
            }}
          />
        </>
      )}
      {currentQues === 1 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">
            When’s your moment to break free?
          </h1>
          <input
            type="time"
            className="text-2xl mt-8 font-bold"
            value={ans2}
            onChange={(e) => setAns2(e.target.value)}
          />
        </>
      )}
      {/* {currentQues === 2 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">Days off?</h1>
          {days.map((item, index) => (
            <div key={item.id + index}>
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  id={item.name}
                  checked={(day: string) => ans3.includes(day)}
                  onCheckedChange={(checked: any) => {
                    return checked
                      ? setAns3([...ans3, item.name])
                      : ans3.filter((value) => value !== item.name);
                  }}
                />
                <label htmlFor={item.name} className="font-normal">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </>
      )} */}
      {currentQues === 3 && (
        <>
          <h1 className="text-2xl text-center mt-8 font-bold">
            What’s your Hustle?
          </h1>
          <div className="w-54">
            <Radio
              onChange={(item) => {
                console.log(item);
                setAns4(item);
              }}
            />
          </div>
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
        {currentQues === 3 && (
          <Button
            className="mt-4 bg-[#395886] text-white px-4 py-2"
            onClick={handleclick}
          >
            Generate Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default Main;
