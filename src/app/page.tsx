import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="text-center">WELCOME VERDANT</div>
      <div className="flex gap-4">
        <Link href={"/sign-up"}>
          <Button>Sign Up</Button>
        </Link>
        <Link href={"/sign-in"}>
          <Button>Log in</Button>
        </Link>
      </div>
    </div>
  );
}
