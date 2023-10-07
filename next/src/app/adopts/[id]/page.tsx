// pages/adopts/[id].jsx
"use client";
import ContainerHeader from "@/components/ContainerHeader";
import PetDetails from "@/components/PetDetails";
import React from "react";
import { useParams } from "next/navigation";

const dogDetailsData = [
  {
    id: 1,
    name: "luna",
    description: "Luna is a lovely dog.",
    image: "/images/Maltese.png",
  },
  { id: 2, name: "max", description: "Max is a friendly dog." },
  { id: 3, name: "coco", description: "Coco is an energetic dog." },
  { id: 4, name: "oliver", description: "Oliver is a calm dog." },
  { id: 5, name: "daisy", description: "Daisy is an adorable dog." },
];

const PetDetailsPage = () => {
  const { id } = useParams();
  const selectedDog = dogDetailsData.find((dog) => dog.id === parseInt(id));

  return (
    <div className="min-h-screen flex flex-col items-center pb-10">
      <ContainerHeader />
      <div className="text-4xl flex flex-col justify-center items-start font-bold text-left mt-4">
        {selectedDog ? <PetDetails dog={selectedDog} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PetDetailsPage;
