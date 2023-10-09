// pages/adopts/[id].jsx
"use client";
import ContainerHeader from "@/components/ContainerHeader";
import PetDetails from "@/components/PetDetails";
import React from "react";
import { useParams } from "next/navigation";
import data from "../../data.json";
import Header from "@/components/Header";

const PetDetailsPage = () => {
  const { id } = useParams();
  const selectedDog = data.find((dog) => dog.id === parseInt(id));

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="my-4 flex flex-col">
          <div className="font-bold text-2xl border-b-2 border-gray-300 pb-4">
            {selectedDog.name} Info
          </div>
        </div>
        {selectedDog ? <PetDetails dog={selectedDog} /> : <p>Loading...</p>}
      </div>
    </>
  );
};

export default PetDetailsPage;
