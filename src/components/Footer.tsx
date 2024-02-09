import { IoHome } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="flex fixed bottom-0 w-full z-10 bg-[#B1C9EF] text-black h-16 items-center justify-around shadow-[rgba(0,0,0,0.35)_0px_5px_15px,rgba(27,133,219,0.5)_5px_10px_15px] rounded-top-[10px]">
      <button className="w-10 h-10 bg-transparent flex items-center justify-center transition-all duration-[ease-in-out] delay-[0.3s] cursor-pointer rounded-[50%] border-0 hover:translate-y-[-3px]">
        <svg
          className="text-xl"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
        </svg>
      </button>
      <button className="bg-transparent flex items-center justify-center  transition-all duration-[ease-in-out] delay-[0.3s] cursor-pointer rounded-[50%] border-0 hover:translate-y-[-3px]">
        <IoHome width={15} height={15} />
      </button>
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
    </div>
  );
};

export default Footer;
