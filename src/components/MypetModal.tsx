import { AppContext } from "@/app/layout";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [userResponse, setUserResponse] = useState();

  const router = useRouter();

  const getMypet = async () => {
    try {
      setIsLoading(true);

      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?userId=${account.id}`
      );

      const responsePet: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/vc?petId=${response.data.response[index].id}`
      );

      setUserResponse(response.data.response[index]);
      setMypetInfo(responsePet.data.response);
      setMypetImg(response.data.response[index].image_Url);
      setIsListing(response.data.response[index].isListing);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeListingValue = async () => {
    try {
      const data = {
        id: mypetInfo.id,
        userId: userResponse.userId,
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet`,
        data
      );
      setIsListing(!isListing);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    router.refresh();
  }, [isListing]);

  useEffect(() => {
    if (account) {
      getMypet();
    }
  }, [account]);

  return (
    <div className="fixed top-0 left-1/2 bottom-0 right-0 -translate-x-1/2 flex items-center justify-center w-full z-50">
      <div
        className=" bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        onClick={close}
      ></div>
      <div className="w-[90%] bg-white p-8 rounded-lg max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
              {isListing === false ? (
                <button onClick={changeListingValue}>Sale</button>
              ) : (
                <button onClick={changeListingValue}>Cancel</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypetModal;
