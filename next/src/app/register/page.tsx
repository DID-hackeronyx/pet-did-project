"use client";
import React, { useState, useRef, useEffect } from "react";
import ContainerHeader from "@/components/ContainerHeader";
import Register from "@/components/Register";
import img from "../../../public/images/camera.png";
import Image from "next/image";
import Ipfs from "@/components/Ipfs";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setSelectedImage(event.target.result);
          setImagePath(file.name); // or file.path if it contains the full path
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (selectedImage) {
      // Hide content after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowContent(false);
      }, 3000);

      return () => clearTimeout(timeoutId); // Cleanup on component unmount or when selectedImage changes
    }
  }, [selectedImage]);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center">
        <ContainerHeader title="Register" />
        {showContent && (
          <>
            {/* <Ipfs /> */}
            {!selectedImage && (
              <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                <Image src={img} width={40} height={20} alt="camera image" />
              </div>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            {selectedImage && (
              <div>
                <h2>Preview:</h2>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "300px" }}
                />
                <p>File Path: {imagePath}</p>
              </div>
            )}
          </>
        )}
        {!showContent && <Register selectedImage={selectedImage} />}
      </div>
    </div>
  );
};

export default Page;
