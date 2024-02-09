import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FcLike } from "react-icons/fc";

const Post = ({
  avatar,
  name,
  image,
}: {
  avatar: string;
  name: string;
  image: string;
}) => {
  return (
    <>
      <div className="m-5 flex items-center gap-4">
        <Avatar>
          <AvatarImage alt="Mentor" src={`/${avatar}.png`} />
          <AvatarFallback className="bg-[#395886] text-white">X</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold text-[#395886]">{name}</h1>
      </div>
      <div>
        <Image src={`/${image}.png`} alt="Picture" width={500} height={500} />
      </div>
      <div className="m-5">
        <FcLike className="w-10 h-10" />
      </div>
    </>
  );
};

export default Post;
