// pages/adopts/index.jsx
"use client";

import ContainerHeader from "@/components/ContainerHeader";
import PetCard from "@/components/PetCard";
import data from "../data.json";
import { fetchData } from "../api";

const Adopts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pb-10">
      <ContainerHeader title="Adopts" />
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
