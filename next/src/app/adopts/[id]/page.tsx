// pages/adopts/[id].jsx
"use client";
import ContainerHeader from "@/components/ContainerHeader";
import PetDetails from "@/components/PetDetails";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import data from "../../data.json";
import Header from "@/components/Header";
import axios from "axios";

const PetDetailsPage = () => {
  const { id } = useParams();
  const [ data , setData ] = useState() ;
  const [ pet , setPet ] = useState() ;

  const get_data = async() => {

    const response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/vc?petId=${id}`
    );

    const response2: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?id=${id}`
    );

    setPet( response2.data.response ) ;
    // console.log( response2.data.response ) ;
    setData( response.data.response ) ;
    // console.log( response.data.response ) ;
    
  }

  useEffect(() => {
    get_data() ;
  } ,[] ) ;

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="my-4 flex flex-col">
          <div className="font-bold text-2xl border-b-2 border-gray-300 pb-4">
          {data?.name} Info
          </div>
        </div>
        {data ? <PetDetails dog={data} url={pet.image_Url} /> : <p>Loading...</p>}
      </div>
    </>
  );
};

export default PetDetailsPage;
