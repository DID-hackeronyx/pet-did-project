import React from "react";
import Link from "next/link";

const Welcome = ({ onPrevious }: any) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-4xl h-full flex flex-col justify-center items-start font-bold text-left w-[80%]">
        <div className="h-[60vh]">
          <p className="mb-14">Hello!</p>
          <p>Manage your </p>
          <p>pet's information</p>
          <p>through DID</p>
          <p>and find your pet</p>
          <p>through verified</p>
          <p>and transparent</p>
          <p>records.</p>
        </div>
        <div className="mt-32 flex flex-col w-full text-sm">
          <Link href="/login">
            <button className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
