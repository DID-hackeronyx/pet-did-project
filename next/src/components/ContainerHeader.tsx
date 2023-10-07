import React from "react";
import BackButton from "./BackButton";

const ContainerHeader = () => {
  return (
    <div className="flex  items-center font-bold  pb-12">
      <BackButton />
      <div className="pl-10">Adopts</div>
    </div>
  );
};

export default ContainerHeader;
