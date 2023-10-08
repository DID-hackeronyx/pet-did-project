import React from "react";
import Link from "next/link";
import img from "../../public/images/pet-icon.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex font-bold justify-between items-center my-5 text-2xl">
      <Link href="/main">
        <div className="flex items-center justify-center">
          <Image src={img} width={35} height={35} alt="home page img" />
          <div className="ml-2">ZK-Paw</div>
        </div>
      </Link>
      <div className="text-base">Hi Michael</div>
    </div>
  );
};

export default Header;
