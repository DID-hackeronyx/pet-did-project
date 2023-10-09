"use client";
import React, { useContext, useEffect, useState } from "react";
import img from "../../../public/images/pet-icon.png";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Mypets from "../mypets/page";
import Header from "@/components/Header";
import { AppContext } from "../layout";
import axios from "axios";
import MypetModal from "@/components/MypetModal";

const Main = () => {
  const { account, setAccount, web3 } = useContext(AppContext);
  const [mypetInfo, setMypetInfo] = useState([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState("");

  const open = (index) => {
    setIsOpen(true);
    setModalIndex(index); // 모달에 전달할 인덱스 설정
  };

  const close = () => {
    setIsOpen(false);
  };

  const getMypet = async () => {
    try {
      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?userId=${account.id}`
      );
      setMypetInfo(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(account);
    if (account) {
      getMypet();
    }
  }, [account]);

  return (
    <>
      <div className="min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="font-bold text-xl">Your Pets</div>
        <div className="text-gray-400 text-sm">
          Manage your pets with TrustTail
        </div>
        <div className="bg-white rounded-md grid grid-cols-2 gap-4 my-5 p-4">
          {mypetInfo &&
            mypetInfo?.map((pet, index) => (
              <button onClick={() => open(index)} key={index}>
                {/* 클릭 시 openModal 함수 호출 */}
                <Image
                  key={index}
                  src={pet.image_Url}
                  width={200}
                  height={200}
                  className="shadow-lg"
                />
              </button>
            ))}

          {isOpen && (
            <MypetModal
              title="Alarm"
              message="Do you want to adopt?"
              close={close}
              index={modalIndex} // 모달에 인덱스 전달
            />
          )}
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Main;
