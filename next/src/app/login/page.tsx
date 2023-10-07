"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img1 from "../../../public/images/pet-breeds.webp";
import img from "../../../public/images/pet-icon.png";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session);

  const gotoMain = () => {
    //Let's start zk-pet 버튼 클릭하면 Main 페이지로 이동.
    router.push("/main");
  };

  //로그인 정보가 있으면 바로 아래 코드 return.
  if (session && session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-10 pt-2">
        <div className="flex flex-col items-center font-bold">
          <div className="flex justify-center items-center mb-4">
            <Image src={img} width={40} height={20} alt="home page img" />
            <div className="text-4xl pl-2">Hi {session.user.name}</div>
          </div>
          <Image src={img1} width={140} height={60} alt="home page img" />
          <div className="mt-14 flex flex-col w-[300px] text-sm">
            <button
              className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold mb-4"
              onClick={() => {
                gotoMain();
              }}
            >
              Let's start ZK-PAW
            </button>

            <button
              className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold"
              onClick={() => {
                signOut();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pb-10 pt-2">
      <div className="flex flex-col items-center font-bold">
        <div className="flex justify-center items-center mb-4">
          <Image src={img} width={40} height={20} alt="home page img" />
          <div className="text-4xl pl-2">ZK PAW</div>
        </div>
        <Image src={img1} width={140} height={60} alt="home page img" />
        <div className="mt-14 flex flex-col w-[300px] text-sm">
          {/* <button className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold mb-4">
            Register
          </button> */}

          <button
            className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 font-bold"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
