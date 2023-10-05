// components/Banner.js

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PiDogBold } from "react-icons/pi";
const Banner = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 m-2 p-4 bg-gray-800 text-white flex rounded-full justify-around">
      <div className="flex items-center justify-between pl-20 pr-20">
        <Link href="/main">
          <FaHome className="text-lg ml-2" />
          <div className="text-sm font-semibold hover:text-gray-300">Home</div>
        </Link>
      </div>
      <div className="pl-20 pr-20">
        <Link href="/mypage">
          <PiDogBold className="text-lg ml-4" />
          <div className="text-sm font-semibold hover:text-gray-300">
            Adopts
          </div>
        </Link>
      </div>
      {/* Add more banners as needed */}
    </div>
  );
};

export default Banner;
