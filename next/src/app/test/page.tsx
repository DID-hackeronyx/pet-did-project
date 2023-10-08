"use client"
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { 
  IPaymaster, 
  BiconomyPaymaster,  
    IHybridPaymaster, 
    SponsorUserOperationDto,
    PaymasterMode
} from '@biconomy/paymaster'
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json' ;

const Test = () => {

   
const bundler: IBundler = new Bundler({
    // get from biconomy dashboard https://dashboard.biconomy.io/
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',     
    chainId: 80001 ,// or any supported chain of your choice
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })


const paymaster: IPaymaster = new BiconomyPaymaster({
  // get from biconomy dashboard https://dashboard.biconomy.io/
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/lxGpkg8YA.16945486-67f6-4d84-b0f3-a2d908ff0058' 
})

const privateKey = '0xc05875707bd1f9517cdcacc66ae254910cd8af7f1fd5b1fea40169b4d49f916c';
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/318af53be76b4bc39a0b3e9f97830a26');

const signer = new ethers.Wallet(privateKey, provider);


const nftAddress = "0x202118c90ad372C50aCD43edA9A1Fa3b70b9e065"

const contract = new ethers.Contract(
      nftAddress,
      abi,
      provider,
    )

const make_account = async() => {

    
const ownerShipModule = await ECDSAOwnershipValidationModule.create({
    signer: signer , // ethers signer object
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
  })

    
let smartAccount = await BiconomySmartAccountV2.create({
    chainId: 80001 , //or any chain of your choice
    bundler: bundler, // instance of bundler
    paymaster: paymaster, // instance of paymaster
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, //entry point address for chain
    defaultValidationModule: ownerShipModule , // either ECDSA or Multi chain to start
    activeValidationModule: ownerShipModule  // either ECDSA or Multi chain to start
})
const address = await smartAccount.getAccountAddress()
console.log("address", address) ;

// use the ethers populateTransaction method to create a raw transaction
const minTx = await contract.populateTransaction.mintNFT(1);
console.log( 'minTx : ' , minTx);
const tx1 = {
  to: nftAddress,
  data: minTx.data,
};
let userOp = await smartAccount.buildUserOp([tx1]);
console.log( 'userOP : ' , userOp ) ;
const biconomyPaymaster =
smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
let paymasterServiceData: SponsorUserOperationDto = {
mode: PaymasterMode.SPONSORED,
smartAccountInfo: {
  name: 'BICONOMY',
  version: '2.0.0'
},
};
const paymasterAndDataResponse =
await biconomyPaymaster.getPaymasterAndData(
  userOp,
  paymasterServiceData
);

userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
const userOpResponse = await smartAccount.sendUserOp(userOp);
console.log("userOpHash", userOpResponse);
const { receipt } = await userOpResponse.wait(1);
console.log("txHash", receipt.transactionHash);
}

useEffect( () => {
    make_account()
} ,[] ) ;

    return(
        <div> test page </div> 
    )
}

export default Test;
