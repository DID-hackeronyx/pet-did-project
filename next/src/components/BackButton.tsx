"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const BackButton = () => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && (
        <button
          className=" text-white p-3 rounded-md shadow-md focus:outline-none focus:ring  focus:ring-opacity-50"
          onClick={() => router.back()}
          aria-label="back"
        >
          <Image
            src="/images/left-arrow.png"
            alt="gallery"
            width={30}
            height={30}
            className="text-white"
          />
        </button>
      )}
    </>
  );
};

export default BackButton;
