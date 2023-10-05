import React from "react";
import img from "../../../public/images/pet-icon.png";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";

const Main = () => {
  return (
    <div className="flex flex-col items-center  pb-10 pt-6">
      <div className=" flex font-bold text-left ">
        <Link href="/main">
          <div className="text-4xl inline-flex items-center justify-center gap-1 pr-24">
            <Image src={img} width={20} height={20} alt="home page img" />
            <h1 className="font-medium">PetsDID</h1>
          </div>
        </Link>
        <div className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 cursor-pointer">
          Login
        </div>
      </div>

      <div className="mt-[80px] mb-[60px] ">
        <h2 className="font-medium text-[44px] leading-[58px]">Hello!</h2>
        <div className="pt-5">
          <h2 className="text-gray-dark text-[20px]">
            Manage your pet's information through DID
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and find your pet through verified
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and transparent records.
          </h2>
        </div>
        <div className="pt-5">
          <h2 className="text-gray-dark text-[20px]">
            Manage your pet's information through DID
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and find your pet through verified
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and transparent records.
          </h2>
        </div>
        <div className="pt-5">
          <h2 className="text-gray-dark text-[20px]">
            Manage your pet's information through DID
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and find your pet through verified
          </h2>
          <h2 className="text-gray-dark text-[20px]">
            and transparent records.
          </h2>
        </div>
      </div>

      <Banner />
    </div>
  );
};

export default Main;
