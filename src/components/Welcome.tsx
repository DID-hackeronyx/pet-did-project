"use client";
import React, { useState } from "react";
import FirstPage from "./FirstPage";
import Link from "next/link";

const Welcome = () => {
  const [currentPage, setCurrentPage] = useState(false);

  //화면 클릭 시 true로 변환.
  const handleClick = (e) => {
    if (!e.target.matches("button")) {
      setCurrentPage(true);
    }
  };

  //현재 상태를 다시 false로 변환.
  const handlePrevious = () => {
    setCurrentPage(false);
  };

  return (
    //currentPage가 false이면 FirstPage를 렌더링. currentPage가 true이면 클릭 후 콘텐츠를 렌더링
    <div
      className="min-h-screen flex flex-col "
      onClick={(e) => handleClick(e)}
    >
      {!currentPage && <FirstPage />}
      {currentPage && (
        <div className="min-h-screen flex items-center justify-center pb-10 pt-6">
          <div className="text-4xl h-full flex flex-col justify-center items-start font-bold text-left">
            <p className="mb-4">Hello!</p>
            <p>Manage your </p>
            <p>pet's information</p>
            <p>through DID</p>
            <p>and find your pet</p>
            <p>through verified</p>
            <p>and transparent</p>
            <p>records.</p>
            <div className="mt-14 flex flex-col w-[300px] mb-[75px] text-sm ">
              <button
                className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold "
                onClick={() => handlePrevious()}
              >
                Previous
              </button>
              <Link href="/login">
                <button className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold mt-4">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
