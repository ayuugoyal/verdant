import Link from "next/link";
import { IoHome } from "react-icons/io5";

const Footer = ({ resId }: { resId: string }) => {
  return (
    <div className="flex fixed bottom-0 w-full z-10 bg-[#B1C9EF] text-black h-16 items-center justify-around shadow-[rgba(0,0,0,0.35)_0px_5px_15px,rgba(27,133,219,0.5)_5px_10px_15px] rounded-top-[10px]">
      <Link href={`/mainApp/${resId}/`}>
        <button className="bg-transparent flex items-center justify-center  transition-all duration-[ease-in-out] delay-[0.3s] cursor-pointer rounded-[50%] border-0 hover:translate-y-[-3px]">
          <IoHome width={15} height={15} />
        </button>
      </Link>
      <Link href={`/mainApp/${resId}/verdesocial`}>
        <button className="w-10 h-10 bg-transparent flex items-center justify-center  transition-all duration-[ease-in-out] delay-[0.3s] cursor-pointer rounded-[50%] border-0 hover:translate-y-[-3px]">
          <svg
            className="text-xl"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Footer;
