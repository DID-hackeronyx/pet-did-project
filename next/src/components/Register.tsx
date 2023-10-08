"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import img from "../../public/images/coco.png";
import { BiSolidDog } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";

const Register = ({ selectedImage }) => {
  // 상태(State) 정의
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [medicalRecord, setMedicalRecord] = useState("");

  const [vcName, setVcName] = useState(null);

  //강아지 did
  const petInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/did`
      );
      const petDid = response.data.holderEthrDid.did;
      console.log(petDid);
      return petDid; // petDid값 return
    } catch (error) {
      console.log(error);
      return null; // 오류났을 때 메시지(null)값 처리.
    }
  };

  //데이터를 백에 전송 후 Issuer sign을 통해 vc발급
  const vcInfo = async (petDid) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/vc`,
        {
          did: petDid,
          name: name,
          date: date,
          m_records: medicalRecord,
        }
      );
      console.log(JSON.stringify(response, null, 2));
      setVcName(response.data.vc.credentialSubject.name);
      // Handle success, maybe show a message to the user
    } catch (error) {
      console.log(error);
      // Handle the error gracefully, maybe show a message to the user
    }
  };

  const handleVcButtonClick = async () => {
    const petDid = await petInfo(); // petInfo가 petDid를 가져올 때까지 대기
    if (petDid) {
      vcInfo(petDid);
    } else {
      console.log("error");
    }
  };
  return (
<<<<<<< HEAD
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-center w-full my-10">
        <Image src={img} alt="plusImage" width={192} height={192} />
=======
    <div className="flex flex-col items-start">
      <div className="flex ml-10 mb-4">
        <Image src={selectedImage} alt="plusImage" width={192} height={192} />
>>>>>>> 44f9ea56d0356af3586f1e0982da17f2c1a2d962
      </div>
      {/* {vcName && <p>Name from VC: {vcName}</p>} */}
      <div className="flex justify-center items-center mb-6 w-full">
        <BiSolidDog className="w-8 h-8 mr-4" />
        {/* Name 입력란 */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg text-gray-600 border rounded-md px-2 py-1 w-full"
        />
      </div>
      <div className="flex justify-center items-center mb-6 w-full">
        <FaBirthdayCake className="w-8 h-8 mr-4" />
        {/* Date 입력란 */}
        <input
          type="text"
          placeholder="Enter Birthday"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-lg text-gray-600 border rounded-md px-2 py-1 w-full"
        />
      </div>
      <div className="flex justify-center items-center mb-6 w-full">
        <BsFillFileEarmarkMedicalFill className="w-8 h-8 mr-4" />
        {/* Medical Records 입력란 */}
        <input
          type="text"
          placeholder="Enter Medical Records"
          value={medicalRecord}
          onChange={(e) => setMedicalRecord(e.target.value)}
          className="text-lg text-gray-600 border rounded-md px-2 py-1 w-full h-32"
        />
      </div>
      <div className="self-end">
        {/* "입양" 버튼에 이벤트 핸들러 추가 */}
        <button
          onClick={handleVcButtonClick}
          className="px-6 py-2 border border-blue-300 text-blue-400 font-semibold text-lg rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
