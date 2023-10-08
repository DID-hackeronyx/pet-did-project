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
      <div>
        <div className="min-h-screen flex flex-col items-center">
          <ContainerHeader title="Register" />
          <Ipfs />     
        </div>
      </div>
    
  );
};

export default Page;
