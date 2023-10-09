"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img1 from "../../../public/images/pet-breeds.webp";
import img from "../../../public/images/pet-icon.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppContext } from "../layout";
import axios from "axios";

const Login = () => {
  const { account, setAccount, web3 } = useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();

  const gotoMain = async () => {
    try {
      const id = session?.user.id;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/user?token=${id}`
      );
      console.log( response.data.ok ) ;

      if (response.data.ok) {
        setAccount(response.data.user);
      } else {
        const newAccount = web3.eth.accounts.create();
        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/user`,
          {
            unique_key: id,
            pvk: newAccount.privateKey,
            name: id,
          }
        );
        setAccount(user.data.user);
      }
      router.push("/main");
    } catch (error) {
      console.error(error);
    }
  };

  // 로그인 정보 있으면 바로 Main페이지로 이동
  useEffect(() => {
    if (session) gotoMain();
  }, [session]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="text-4xl h-full flex flex-col justify-center items-center font-bold text-left w-[80%]">
        <div className="h-[60vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex mb-4">
              <Image src={img} width={40} height={20} alt="home page img" />
              <div className="text-4xl pl-2">ZK-PAW</div>
            </div>
            <Image src={img1} width={140} height={60} alt="home page img" />
          </div>
        </div>
        <div className="mt-32 flex flex-col w-full text-sm">
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
