export default function Loading() {
  return (
    <div className="flex justify-center flex-col gap-5 items-center h-screen bg-[#F0F3FA]">
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
      <div className=" text-center font-bold text-3xl">
        AI is generating your Schedule.....
      </div>
    </div>
  );
}
