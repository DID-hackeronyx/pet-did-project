"use client";
import { useState } from "react";
import imgIcon from "../../public/images/pet-icon.png";
import Image from "next/image";
import Modal from "./Modal";

const PetDetails = ({ dog }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const confirm = () => {
    console.log("confirm clicked");
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md relative">
      <div className="flex flex-col items-start">
        <div className="flex ml-10 mb-4">
          <Image
            src={`/images/${dog.name}.png`}
            alt={dog.name}
            width={192}
            height={192}
          />
        </div>
        <div className="flex mb-4">
          <Image
            src={imgIcon}
            alt="Medical Records"
            className="w-8 h-8 object-cover mr-2"
          />
          <h2 className="text-xl text-gray-600 mb-4">Name: {dog.name}</h2>
        </div>
        <div className="flex mb-4">
          <Image
            src={imgIcon}
            alt="Medical Records"
            className="w-8 h-8 object-cover mr-2"
          />
          <h2 className="text-xl text-gray-600 mb-4">
            Medical Records: {dog.m_records}
          </h2>
        </div>
        <div className="flex mb-4">
          <Image
            src={imgIcon}
            alt="Medical Records"
            className="w-8 h-8 object-cover mr-2"
          />
          <p className="text-base text-gray-600 mb-4">Date: {dog.date}</p>
        </div>
        <div className="flex">
          <Image
            src={imgIcon}
            alt="Medical Records"
            className="w-8 h-8 object-cover mr-2"
          />
          <p className="text-base text-gray-600">
            Issuance Date: {dog.issuanceDate}
          </p>
        </div>
        <div className="self-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-1 rounded"
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
