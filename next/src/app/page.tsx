"use client";
import FirstPage from "@/components/FirstPage";
import Welcome from "@/components/Welcome";
import React, { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("FirstPage");
  //
  const handlePrevious = () => {
    setCurrentPage("FirstPage");
  };

  const handleNext = () => {
    setCurrentPage("Welcome");
  };

  return (
    //currentPage값이 FirstPage면 FirstPage렌더링, Welcome이면 Welcom페이지 렌더링
    <div>
      {currentPage === "FirstPage" && <FirstPage onClick={handleNext} />}
      {currentPage === "Welcome" && <Welcome onPrevious={handlePrevious} />}
    </div>
  );
}
