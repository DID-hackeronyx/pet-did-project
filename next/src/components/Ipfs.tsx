"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Ipfs = () => {
  const [fileImg, setFileImg] = useState(null);
  const sendFileToIPFS = async (e) => {
    if (fileImg) {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        console.log(formData);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
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
        type="file"
        onChange={() => setFileImg(e.target.files[0])}
        required
      />
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default Ipfs;
