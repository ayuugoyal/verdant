import Image from "next/image";
import { getUser } from "@/actions/auth";

export default async function Hello() {
  const user = await getUser();
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
        <div>Hello! {user?.name}</div>
      </div>
    </div>
  );
}
