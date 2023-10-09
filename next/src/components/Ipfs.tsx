"use client";
import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import {
  IPaymaster,
  BiconomyPaymaster,
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from "@biconomy/paymaster";
import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
import { ethers } from "ethers";
import { AppContext } from "@/app/layout";
import { BiSolidDog } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import LoadingModal from "./LoadingModal";

// import abi from './abi.json' ;

// const nftAddress = "0x202118c90ad372C50aCD43edA9A1Fa3b70b9e065"

// const contract = new ethers.Contract(
//       nftAddress,
//       abi,
//       provider,
//     )

// // use the ethers populateTransaction method to create a raw transaction
// const minTx = await contract.populateTransaction.mintNFT(1);
// console.log( 'minTx : ' , minTx);
// const tx1 = {
//   to: nftAddress,
//   data: minTx.data,
// };
// let userOp = await smartAccount.buildUserOp([tx1]);
// console.log( 'userOP : ' , userOp ) ;
// const biconomyPaymaster =
// smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
// let paymasterServiceData: SponsorUserOperationDto = {
// mode: PaymasterMode.SPONSORED,
// smartAccountInfo: {
//   name: 'BICONOMY',
//   version: '2.0.0'
// },
// };
// const paymasterAndDataResponse =
// await biconomyPaymaster.getPaymasterAndData(
//   userOp,
//   paymasterServiceData
// );

// userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
// const userOpResponse = await smartAccount.sendUserOp(userOp);
// console.log("userOpHash", userOpResponse);
// const { receipt } = await userOpResponse.wait(1);
// console.log("txHash", receipt.transactionHash);

const Ipfs = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [m_records, setM_records] = useState("");
  const [r_date, setR_date] = useState("");
  const { account, setAccount, web3 } = useContext(AppContext);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeM_records = (e) => {
    setM_records(e.target.value);
  };
  const onChangeR_date = (e) => {
    setR_date(e.target.value);
  };

  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) return;

    setImageFile(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet?unique_key=${e.target.files[0].name}`
    );
    console.log(response.data.response);

    // if( response.data.response ) router.push('/main');
    // 백기님 작업하신 페이지로
  };

  const sendFileToIPFS = async (e) => {
    if (imageFile) {
      e.preventDefault();
      try {
        console.log("start");
        setIsOpen(true);
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

        console.log("2");

        let image_url = `https://${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${imageRes.data.IpfsHash}`;
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.

        const bundler: IBundler = new Bundler({
          // get from biconomy dashboard https://dashboard.biconomy.io/
          bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL,
          chainId: 80001, // or any supported chain of your choice
          entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        });

        const paymaster: IPaymaster = new BiconomyPaymaster({
          // get from biconomy dashboard https://dashboard.biconomy.io/
          paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL,
        });

        console.log("check bundler paymaster");
        const newAccount = web3.eth.accounts.create();
        const privateKey = newAccount.privateKey;
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_WEB3_PROVIER
        );
        const signer = new ethers.Wallet(privateKey, provider);

        const ownerShipModule = await ECDSAOwnershipValidationModule.create({
          signer: signer, // ethers signer object
          moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
        });

        let smartAccount = await BiconomySmartAccountV2.create({
          chainId: 80001, //or any chain of your choice
          bundler: bundler, // instance of bundler
          paymaster: paymaster, // instance of paymaster
          entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, //entry point address for chain
          defaultValidationModule: ownerShipModule, // either ECDSA or Multi chain to start
          activeValidationModule: ownerShipModule, // either ECDSA or Multi chain to start
        });
        let address = "did:ethr:maticnum:";
        address = address + (await smartAccount.getAccountAddress());
        // pvk , unique_key , did , userId

        if (account) {
          let response: any = await axios.post(
            `${process.env.NEXT_PUBLIC_BACK_URL}/api/pet`,
            {
              pvk: privateKey,
              unique_key: imageFile.name,
              did: address,
              userId: account.id,
              image_Url: image_url,
            }
          );

          console.log("pet ok");

          // console.log( did , name , date , m_records ) ;
          console.log(response.data);

          const response2 = await axios.post(
            `${process.env.NEXT_PUBLIC_BACK_URL}/api/vc`,
            {
              name,
              m_records,
              r_date,
              did: address,
              petId: Number(response.data.user.id),
            }
          );

          console.log("vc ok");
          close();

          // db : vc 등록    contract : vc 등록

          // console.log(response) ;

          router.push("/main");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={sendFileToIPFS}>
      {!imageFile && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center w-72 h-72 border border-gray-400 rounded-md my-12">
            <label className="text-lg font-semibold text-gray-400">
              <input
                id="imageFile"
                type="file"
                onChange={onChangeImageFile}
                className="hidden"
              />
              Image Upload
            </label>
          </div>
        </div>
      )}
      {imageFile && (
        <div>
          <div className="flex justify-center items-center my-8">
            <img src={selectedImage} alt="Uploaded" className="w-64 h-64" />
          </div>
          <div className="flex items-center my-4">
            <label htmlFor="name">
              <BiSolidDog className="w-8 h-8 mr-4" />
            </label>
            <input
              id="name"
              type="text"
              onChange={onChangeName}
              placeholder="Name"
              className="text-lg font-semibold w-full border-b-2"
            />
          </div>
          <div className="flex items-center my-4">
            <label htmlFor="r_date">
              <FaBirthdayCake className="w-8 h-8 mr-4" />
            </label>
            <input
              id="r_date"
              type="text"
              onChange={onChangeR_date}
              placeholder="Birthdate"
              className="text-lg font-semibold w-full border-b-2"
            />
          </div>
          <div className="flex items-center my-4">
            <label htmlFor="m_records">
              <BsFillFileEarmarkMedicalFill className="w-8 h-8 mr-4" />
            </label>
            <input
              id="m_records"
              type="text"
              onChange={onChangeM_records}
              placeholder="Medical Records"
              className="text-lg font-semibold w-full border-b-2 h-28"
            />
          </div>
        </div>
      )}
      {imageFile && (
        <div className="flex justify-end my-4">
          <button
            type="submit"
            onClick={open}
            className="px-6 py-2 border border-blue-300 text-blue-400 font-semibold text-lg rounded-lg"
          >
            Regist
          </button>
        </div>
      )}
      {isOpen && <LoadingModal />}
    </form>
  );
};

export default Ipfs;
