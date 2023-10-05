import React from "react";
import img from "../../public/images/pet-icon.png";
import Image from "next/image";

const FirstPage = () => {
  return (
    <div className="min-h-screen text-center flex items-center justify-center">
      <Image src={img} width={40} height={20} alt="home page img" />
      <div className="text-4xl font-bold ml-3">Pet's DID</div>
    </div>
  );
};

export default FirstPage;
