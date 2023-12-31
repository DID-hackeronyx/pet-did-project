"use client";
import { useContext, useEffect, useState } from "react";
import imgIcon from "../../public/images/pet-icon.png";
import Image from "next/image";
import Modal from "./Modal";
import { BiSolidDog } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { GoIssueClosed } from "react-icons/go";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppContext } from "@/app/layout";

const PetDetails = ({ vc , dog }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { account, setAccount, web3 } = useContext(AppContext);
  
  const route = useRouter() ;
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const confirm = async() => {
    console.log("confirm clicked");

    console.log( dog , vc , account ) ;

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet/` ,
      {
        id : dog.id ,
        userId : account.id, 
      }
    );

    route.push( '/main' ) ;
    setIsOpen(false);
  };

// useEffect( () => {console.log( url ) ;} ,[]) ;
  

  return (
    <div className="bg-white p-6 rounded-md shadow-md relative">
      <div className="flex flex-col">
        <div className="flex justify-center items-center mb-6">
          { dog && 
          <Image
            src={`${dog.image_Url}`}
            alt={vc.name}
            width={192}
            height={192}
          />
        }
        </div>
        <div className="flex mb-4 items-center">
          <BiSolidDog className="w-8 h-8 mr-4" />
          <div className="flex flex-col">
            <div className="text-sm">Name</div>
            <div className="text-2xl font-semibold">{vc?.name}</div>
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <FaBirthdayCake className="w-8 h-8 mr-4" />
          <div>
            <div className="text-sm">Birthday</div>
            <div className="text-2xl font-semibold">{vc?.r_date}</div>
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <BsFillFileEarmarkMedicalFill className="w-8 h-8 mr-4" />
          <div>
            <div className="text-sm">Medical Records</div>
            <div className="text-2xl font-semibold">{vc.m_records}</div>
          </div>
        </div>
        <div className="flex items-center">
          <GoIssueClosed className="w-8 h-8 mr-4" />
          <div>
            <div className="text-sm">Issuance Date</div>
            <div className="text-2xl font-semibold">{vc.issuanceDate}</div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <Link href="/adopts">
            <AiOutlineLeft className="w-10 h-10 text-gray-500" />
          </Link>
          <button
            className="px-6 py-2 border border-blue-300 text-blue-400 font-semibold text-lg rounded-lg"
            onClick={open}
          >
            Adopt
          </button>
        </div>
        {isOpen && (
          <Modal
            title="
            Alarm"
            message="Do you want to adopt?"
            close={close}
            confirm={confirm}
          />
        )}
      </div>
    </div>
  );
};

export default PetDetails;
