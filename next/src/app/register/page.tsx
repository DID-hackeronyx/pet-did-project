import ContainerHeader from "@/components/ContainerHeader";
import React from "react";
import Register from "@/components/Register";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <ContainerHeader title="Register" />
      <Register />
    </div>
  );
};

export default Page;
