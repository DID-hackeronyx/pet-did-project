"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Ipfs = () => {
  
  const [imageFile, setImageFile] = useState<File>();
  const [url , setUrl] = useState() ;

  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    setImageFile(e.target.files[0]);
  };

  const sendFileToIPFS = async (e) => {
    if (imageFile) {
      e.preventDefault();
      try {

        const imageFormData = new FormData();

        imageFormData.append("file", imageFile);
        imageFormData.append(
          "pinataMetadata",
          JSON.stringify({
            name: `1_image`,
          })
        );
        imageFormData.append(
          "pinataOptions",
          JSON.stringify({
            cidVersion: 0,
          })
        );      
        const imageRes = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_KEY}`,
            },
          }
        );

        setUrl( `https://${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${imageRes.data.IpfsHash}` ) ;
        console.log( imageRes.data.IpfsHash ) ;
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={sendFileToIPFS}>
       <input
        id="imageFile"
        type="file"
        onChange={onChangeImageFile}
    />
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default Ipfs;
