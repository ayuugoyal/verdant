"use client";
import Image from "next/image";
import { getUser } from "@/actions/auth";
import { useEffect } from "react";
import { User } from "@/db/schema";
import { useState } from "react";

export default function Hello() {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    async function fetchUser() {
      return await getUser();
    }
    fetchUser().then((user: User | undefined) => {
      console.log(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      return setUser(user || ({} as User));
    });
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Image
          src={"/logo.png"}
          alt="logo"
          className="z-10"
          height={200}
          width={200}
        />
        <div>Hello! {user.name}</div>
      </div>
    </div>
  );
}
