"use client";
import Hello from "@/components/Hello";
import Main from "@/pages/main";
import * as React from "react";

const Page = () => {
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return <div>{showLoader ? <Hello /> : <Main />}</div>;
};

export default Page;
