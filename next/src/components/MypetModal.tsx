import { AppContext } from "@/app/layout";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  title?: string;
  message?: string;
  index?: any;
  close?: () => void;
};

const MypetModal = ({ title, message, close, index }: Props) => {
  const { account, setAccount, web3 } = useContext(AppContext);
  const [mypetInfo, setMypetInfo] = useState();
  const [mypetImg, setMypetImg] = useState();
  const [isListing, setIsListing] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  const getMypet = async () => {
    try {
      // 데이터를 가져오는 중임을 표시
      setIsLoading(true);

      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?userId=${account.id}`
      );

      const responsePet: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/vc?petId=${response.data.response[index].id}`
      );

      setMypetInfo(responsePet.data.response);
      setMypetImg(response.data.response[index].image_Url);
      setIsListing(response.data.response[index].isListing);

      // 데이터 가져오기가 완료되었음을 표시
      setIsLoading(false);
    } catch (error) {
      console.error("데이터를 가져오는 중에 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    console.log(account);
    getMypet();
  }, []);

  useEffect(() => {
    getMypet();
  }, [account]);

  return (
    <div className="fixed top-0 left-1/2 bottom-0 right-0 -translate-x-1/2 flex items-center justify-center w-full z-50">
      <div
        className=" bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        onClick={close}
      ></div>
      <div className="w-[90%] bg-white p-8 rounded-lg max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {isLoading ? (
          // 로딩 중일 때 보여줄 내용
          <p>Loading...</p>
        ) : (
          // 데이터를 가져온 후에 보여줄 내용
          <div className="flex flex-col">
            <div className="flex justify-center items-center">
              {mypetImg && <Image src={mypetImg} width={200} height={200} />}
            </div>
            <div>
              <div className="font-bold text-2xl">{mypetInfo.name}</div>
              <div className="flex flex-col my-4">
                <div className="font-bold text-xl">DID</div>
                <div className="text-gray-600">{mypetInfo.did}</div>
              </div>
              <div className="flex flex-col my-4">
                <div className="font-bold text-xl">Birthday</div>
                <div className="text-gray-600">{mypetInfo.r_date}</div>
              </div>
              <div className="flex flex-col my-4">
                <div className="font-bold text-xl">Medical Records</div>
                <div className="text-gray-600">{mypetInfo.m_records}</div>
              </div>
            </div>
            <div className="self-end">
              {isListing === false ? <button>Sale</button> : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypetModal;