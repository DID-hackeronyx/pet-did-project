import React from "react";
import Link from "next/link";

const Welcome = ({ onPrevious }: any) => {
  return (
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
            onClick={onPrevious}
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
  );
};

export default Welcome;
