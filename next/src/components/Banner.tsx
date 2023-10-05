// components/Banner.js

import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 m-2 p-6 bg-gray-800 text-white flex rounded-full justify-around">
      <Link href="/main">
        <div className="text-xl font-semibold hover:text-gray-300 ">Home</div>
      </Link>
      <Link href="/mypage">
        <div className="text-xl font-semibold hover:text-gray-300">My Page</div>
      </Link>
      {/* Add more banners as needed */}
    </div>
  );
};

export default Banner;
