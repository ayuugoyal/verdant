"use client";
import { useState, useEffect } from "react";
import { Question, User } from "@/db/schema";
import { add_questions, getUser } from "@/actions/auth";
import Dropwdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Radio from "@/components/Radio";
import Image from "next/image";
import Loading from "@/app/loading";
export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const [loadings, setLoadings] = useState<boolean>(true);

  const [selected, setSelected] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [userDays, setUserDays] = useState<string[]>([
    "monday",
    "tuesday",
    "friday",
  ]);
  const [currentQues, setCurrentQues] = useState<number>(0);

  const days = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  const { toast } = useToast();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      setUser(userData as User);
    };

    fetchUserData();

    const timer = setTimeout(() => {
      clearTimeout(timer);
      setLoader(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    try {
      setLoadings(false);
      const data = {
        user_id: user?.id,
        question1: selected,
        question2: time,
        question3: userDays,
        question4: item,
      };

      const addQues = await add_questions(data as unknown as Question);
      console.log(addQues);
      window.location.href = `/mainApp/${addQues.id}`;
    } catch (e) {
      console.log("he;;");
      console.log(e);
      setLoadings(true);
      toast({
        variant: "destructive",
        title: "API Expired",
      });
    }
  };

  console.log(selected, item, time, currentQues);
  return (
    <div>
      {loader ? (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <Image
            src={"/logo.png"}
            alt="logo"
            className="z-10"
            height={200}
            width={200}
          />
          <div>Hello! {user?.name}</div>
        </div>
      ) : loadings ? (
        <div
          className="flex flex-col justify-center items-center h-screen text-[#395886]"
          style={{
            backgroundImage: "url('/questions.png')",
            backgroundSize: "cover",
          }}
        >
          <Image
            src="/logo.png"
            width={100}
            className=""
            height={100}
            alt="logo"
          />
          {currentQues === 0 && (
            <>
              <h1 className="text-2xl mt-8 font-bold">What’s your Hustle?</h1>
              <Dropwdown
                onChange={(item) => {
                  console.log(item);
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
              <input
                type="time"
                className="text-2xl mt-8 font-bold"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </>
          )}
          {currentQues === 2 && (
            <>
              <h1 className="text-2xl text-center mt-8 font-bold">
                How active are you?
              </h1>
              <div className="w-54">
                <Radio onChange={(item) => setItem(item)} />
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
            {currentQues != 2 && (
              <Button
                onClick={() => {
                  setCurrentQues((prev) => prev + 1);
                }}
                className="mt-4 bg-[#395886] text-white px-4 py-2"
              >
                Next
              </Button>
            )}
            {currentQues === 2 && (
              <Button
                onClick={handleSubmit}
                className="mt-4 bg-[#395886] text-white px-4 py-2"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
