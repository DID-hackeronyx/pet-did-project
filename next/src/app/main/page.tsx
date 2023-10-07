import React from "react";
import img from "../../../public/images/pet-icon.png";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Mypets from "../mypets/mypet";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  pb-10 pt-6">
      <div className=" flex font-bold text-left pb-12">
        <Link href="/main">
          <div className="text-4xl inline-flex items-center justify-center gap-1 pr-24">
            <Image src={img} width={20} height={20} alt="home page img" />
            <h1 className="font-medium">ZK PAW</h1>
          </div>
        </Link>
        <div className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 cursor-pointer">
          Login
        </div>
      </div>

      <Mypets />

      <Banner />
    </div>
  );
};

export default Main;
