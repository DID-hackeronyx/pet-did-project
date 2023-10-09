import React from "react";
import BackButton from "./BackButton";

const ContainerHeader = ({ title }: any) => {
  return (
    <div className="flex  items-center font-bold pr-32 pb-12">
      <BackButton />
      <div className="pl-24">{title}</div>
    </div>
  );
};

export default ContainerHeader;
