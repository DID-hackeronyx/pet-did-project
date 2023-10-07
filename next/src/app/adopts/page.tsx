import ContainerHeader from "@/components/ContainerHeader";
import PetCard from "@/components/PetCard";
import React from "react";

const dogData = [
  { id: 1, name: "Luna", image: "/images/Maltese.png" },
  { id: 2, name: "Max", image: "/images/Poodle.png" },
  { id: 3, name: "Coco", image: "/images/Pomeranian.png" },
  { id: 4, name: "Oliver", image: "/images/Chihuahua.png" },
  { id: 5, name: "Daisy", image: "/images/Maltese.png" },
];

const Adopts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-10 ">
      <div className="text-4xl h-full flex flex-col justify-center items-start font-bold text-left">
        <ContainerHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {dogData.map((dog) => (
            <PetCard key={dog.id} dog={dog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adopts;
