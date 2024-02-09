"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/db/schema";
import Image from "next/image";
import Popup from "@/components/Popup";
import { getUser } from "@/actions/auth";
import React from "react";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { get_events } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

const detailsToShow = [
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

export default function Page({ params }: { params: { resId: string } }) {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [eventDetails, setEventDetails] = useState<Object[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      setUserDetails(userData as User);
    };
    fetchUserData();

    const getResponse = async () => {
      try {
        const data: Object[] = (await get_events(params.resId)) as Object[];
        console.log(data);
        setEventDetails(data);
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Log in Failed",
          description: (error as Error).message,
        });
      }
    };
    getResponse();
  }, []);

  console.log(eventDetails);
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
          {eventDetails.length !== 0 && (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // weekends={this.state.weekendsVisible}
              initialEvents={eventDetails} // alternatively, use the `events` setting to fetch from a feed
              // select={this.handleDateSelect}
              // eventContent={renderEventContent} // custom render function
              // eventClick={this.handleEventClick}
              // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
          )}
        </div>
      </div>
      <div className="m-6 pb-24">
        <div className="text-[#395886] rounded-xl font-semibold w-fit px-3 py-1 bg-[#D5DEEF]">
          Recommendations
        </div>
        <div>
          {detailsToShow.map((event, index) => (
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
      <Footer resId={params.resId} />
    </div>
  );
}
