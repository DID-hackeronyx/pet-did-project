"use client";
import React, { useState, useRef, useEffect } from "react";
import ContainerHeader from "@/components/ContainerHeader";
import Register from "@/components/Register";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import img from "../../../public/images/camera.png";
import Image from "next/image";
import Ipfs from "@/components/Ipfs";

const Page = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-4 flex flex-col">
          <div className="font-bold text-xl">Regist</div>
          <div className="text-gray-400 text-sm">
            Manage your get after registeration
          </div>
        </div>
        <Ipfs />
      </div>
      <Banner />
    </>
  );
};

export default Page;
