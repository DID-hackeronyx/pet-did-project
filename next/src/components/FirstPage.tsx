import React from "react";
import Image from "next/image";

const FirstPage = ({ onClick }: any) => {
  return (
    <div
      className="min-h-screen text-center flex items-center justify-center"
      onClick={onClick}
    >
      <Image
        src="/images/pet-icon.png"
        width={40}
        height={20}
        alt="home page img"
      />
      <div className="text-4xl font-bold ml-3">ZK PAW</div>
    </div>
  );
};

export default FirstPage;
