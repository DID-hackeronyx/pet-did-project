import ContainerHeader from "@/components/ContainerHeader";
import React from "react";
import Register from "@/components/Register";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

const Page = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-4 flex flex-col">
          <div className="font-bold text-xl">Regist your paw</div>
          <div className="text-gray-400 text-sm">
            Manage your paw after registration
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Register />
        </div>
      </div>
      <Banner />
    </>
    // <div className="min-h-screen flex flex-col items-center">
    //   <ContainerHeader title="Register" />
    //   <Register />
    // </div>
  );
};

export default Page;
