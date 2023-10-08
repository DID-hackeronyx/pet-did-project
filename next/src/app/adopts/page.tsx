// pages/adopts/index.jsx
"use client";
import ContainerHeader from "@/components/ContainerHeader";
import PetCard from "@/components/PetCard";
import Link from "next/link";
import React from "react";
import data from "../data.json"; // Adjust the path accordingly
import axios from "axios";

const petInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/did`
    );
  } catch (error) {
    console.log(error);
  }
};

const Adopts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pb-10">
      <ContainerHeader title="adopts" />
      <button onClick={petInfo}>button</button>
      <div className="text-4xl flex flex-col justify-center items-start font-bold text-left mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((dog) => (
            <PetCard key={dog.id} dog={dog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adopts;
