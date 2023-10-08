// components/Banner.js

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PiDogBold } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";

const Banner = () => {
  return (
    <div className="fixed bottom-6 w-[384px]">
      <div className="grid grid-cols-5 text-center items-center bg-gray-800 text-white rounded-full mx-2 py-4 px-8 text-sm">
        <Link href="/main">
          <div className="flex flex-col justify-center items-center">
            <FaHome className="text-xl font-semibold" />
            {/* <div>home</div> */}
          </div>
        </Link>
        <Link href="/adopts">
          <div className="flex flex-col justify-center items-center">
            <PiDogBold className="text-xl font-semibold" />
            {/* <div>Adopts</div> */}
          </div>
        </Link>
        <Link href="/register">
          <div className="flex flex-col justify-center items-center">
            <HiDocumentArrowUp className="text-xl font-semibold" />
            {/* <div>Register</div> */}
          </div>
        </Link>
        <Link href="/community">
          <div className="flex flex-col justify-center items-center">
            <BsFillPeopleFill className="text-xl font-semibold" />
            {/* <div>Community</div> */}
          </div>
        </Link>
        <Link href="/set">
          <div className="flex flex-col justify-center items-center">
            <AiFillSetting className="text-xl font-semibold" />
            {/* <div>Setting</div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
