import { AppContext } from "@/app/layout";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoadingModal = () => {
  const { account, setAccount, web3 } = useContext(AppContext);

  return (
    <div className="fixed top-0 left-1/2 bottom-0 right-0 -translate-x-1/2 flex items-center justify-center w-full z-50">
      <div className=" bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"></div>
      <div className="w-[90%] bg-white p-8 rounded-lg max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        Regist...
      </div>
    </div>
  );
};

export default LoadingModal;
