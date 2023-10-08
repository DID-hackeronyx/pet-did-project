import React from "react";
import img from "../../../public/images/pet-icon.png";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Mypets from "../mypets/page";
import Header from "@/components/Header";

const Main = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col w-full px-4">
        <Header />
        <Mypets />
      </div>
      <Banner />
    </>
  );
};

export default Main;
