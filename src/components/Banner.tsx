// components/Banner.js
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PiDogBold } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { useRouter } from "next/router";

const Banner = () => {
  // const router = useRouter();

  const [url, setUrl] = useState();

  const saveUrl = () => {
    const url = window.document.location.href;
    setUrl(url);
  };

  useEffect(() => {
    saveUrl();
  }, [url]);

  return (
    <div className="fixed bottom-6 w-[384px]">
      <div className="grid grid-cols-5 text-center items-center bg-gray-800 text-white rounded-full mx-2 py-4 px-8 text-sm">
        <Link href="/main">
          <div className="flex flex-col justify-center items-center">
            <FaHome
              className={`${
                url === "http://localhost:3000/main"
                  ? "text-3xl font-bold"
                  : "text-xl font-semibold"
              }`}
            />
          </div>
        </Link>
        <Link href="/adopts">
          <div className="flex flex-col justify-center items-center">
            <PiDogBold
              className={`${
                url === "http://localhost:3000/adopts"
                  ? "text-3xl font-bold"
                  : "text-xl font-semibold"
              }`}
            />
          </div>
        </Link>
        <Link href="/register">
          <div className="flex flex-col justify-center items-center">
            <HiDocumentArrowUp
              className={`${
                url === "http://localhost:3000/register"
                  ? "text-3xl font-bold"
                  : "text-xl font-semibold"
              }`}
            />
          </div>
        </Link>
        <Link href="/community">
          <div className="flex flex-col justify-center items-center">
            <BsFillPeopleFill
              className={`${
                url === "http://localhost:3000/community"
                  ? "text-3xl font-bold"
                  : "text-xl font-semibold"
              }`}
            />
          </div>
        </Link>
        <Link href="/set">
          <div className="flex flex-col justify-center items-center">
            <AiFillSetting
              className={`${
                url === "http://localhost:3000/set"
                  ? "text-3xl font-bold"
                  : "text-xl font-semibold"
              }`}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
