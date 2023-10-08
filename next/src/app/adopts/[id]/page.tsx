// pages/adopts/[id].jsx
"use client";
import ContainerHeader from "@/components/ContainerHeader";
import PetDetails from "@/components/PetDetails";
import React from "react";
import { useParams } from "next/navigation";
import data from "../../data.json";

const PetDetailsPage = () => {
  const { id } = useParams();
  const selectedDog = data.find((dog) => dog.id === parseInt(id));

  return (
    <div className="min-h-screen flex flex-col items-center pb-10">
      <ContainerHeader title={`${selectedDog.name} DID`} />
      <div className="text-4xl flex flex-col justify-center items-start font-bold text-left mt-4">
        {selectedDog ? <PetDetails dog={selectedDog} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PetDetailsPage;
