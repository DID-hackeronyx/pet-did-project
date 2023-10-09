// pages/adopts/index.jsx
"use client";

import ContainerHeader from "@/components/ContainerHeader";
import PetCard from "@/components/PetCard";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";

const Adopts = () => {

  const [data, setData ] = useState() ;

  const get_list = async() => {

    const response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?isListing=t`
    );

    setData( response.data.response ) ;
    console.log(response.data.response);

  }

  useEffect( () => {
    get_list() ;
  } ,[] ) ;

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-4 flex flex-col">
          <div className="font-bold text-xl">Adopt</div>
          <div className="text-gray-400 text-sm">
            Puppies are waiting to be adopted by you
          </div>
          <div className="grid grid-cols-2 gap-4 my-5">
            {data?.map((dog) => (
              <PetCard key={dog.id} dog={dog} />
            ))}
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Adopts;
