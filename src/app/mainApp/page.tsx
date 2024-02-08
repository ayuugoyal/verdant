"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/db/schema";
import { getUser } from "@/actions/auth";
import Image from "next/image";
import DemoApp from "@/components/Calender";
import Popup from "@/components/Popup";

const eventDetails = [
  {
    name: "Endurance Challenge",
    Description:
      "Push your limits on scenic routes tailored for runners of all levels.",
    date: "April 20, 2024",
    time: "7 AM - 12 PM",
    image: "p1",
  },
  {
    name: "Adventure Wheels",
    Description:
      "Pedal through diverse terrains and distances, embracing the challenge.",
    date: "May 10, 2024",
    time: "8 AM - 4 PM",
    image: "p2",
  },
  {
    name: "Zen Haven",
    Description: "Embrace mindfulness and flexibility in serene sessions.",
    date: "June 5, 2024",
    time: "9 AM - 3 PM",
    image: "p3",
  },
  {
    name: "Summit Quest",
    Description: "Take on the challenge and reach new heights!",
    date: "July 15, 2024",
    time: "10 AM - 5 PM",
    image: "p4",
  },
];

const page = () => {
  const userDetails: User | unknown = JSON.parse(
    window.localStorage.getItem("user") || "{}"
  );
  return (
    <div>
      <div className="flex justify-between mt-7 items-center mr-4">
        <div className="text-[#F0F3FA]">hijjjjjjji</div>
        <Image
          src={"/logo.png"}
          className="text-center"
          alt="logo"
          height={100}
          width={100}
        />
        <Avatar>
          <AvatarImage alt="Mentor" src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-[#395886] text-white">
            {(userDetails as User)?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className="text-[#395886] font-semibold text-center mt-5 text-3xl">
          Your Schedule
        </h2>
        <div className="mx-6 pt-10">
          <DemoApp />
        </div>
      </div>
      <div className="m-6 pb-24">
        <div className="text-[#395886] rounded-xl font-semibold w-fit px-3 py-1 bg-[#D5DEEF]">
          Recommendations
        </div>
        <div>
          {eventDetails.map((event, index) => (
            <Popup
              name={event.name}
              image={event.image}
              description={event.Description}
              date={event.date}
              time={event.time}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
