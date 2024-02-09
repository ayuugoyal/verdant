import { getUser } from "@/actions/auth";
import { User } from "@/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgMenuRound } from "react-icons/cg";
import Post from "@/components/Post";
import Footer from "@/components/Footer";

export default async function Page({ params }: { params: { resId: string } }) {
  const userDetails: User = (await getUser()) as User;

  return (
    <div>
      <div className="flex justify-center items-center gap-20 mt-10 text-[#395886] border-b-4 pb-6">
        <Avatar>
          <AvatarImage alt="Mentor" src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-[#395886] text-white">
            {(userDetails as User)?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold">Your feed</h1>
        <CgMenuRound className="w-10 h-10 text-[#395886]" />
      </div>
      <Post avatar="avatar1" name="chris_hems999" image="post1" />
      <Post avatar="avatar2" name="ImviratKohli" image="post2" />
      <Post avatar="avatar1" name="chris_hems999" image="post1" />
      <Post avatar="avatar2" name="ImviratKohli" image="post2" />
      <Post avatar="avatar1" name="chris_hems999" image="post1" />
      <Footer resId={params.resId} />
    </div>
  );
}
