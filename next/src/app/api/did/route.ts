import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { DIDWithKeys, EthrDIDMethod } from "@jpmorganchase/onyx-ssi-sdk";

type Data = {
  name: string;
};

const createDidEthr = async () => {
    //provider configs for did:ethr
  
    try{
    const ethrProvider2 = {
        name: 'maticmum', 
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/', 
        registry: "0x33C695F89ab8F8f169fa652AD9a896C4e4AD34eb"
    }
    
    const didEthr = new EthrDIDMethod(ethrProvider2) ;
    const holderEthrDid = await didEthr.create() ;
    console.log( holderEthrDid ) ;
  
    }
    catch(error){
        console.error( error ) ;
    }
}

export const GET = async (req : NextApiRequest , res : NextApiResponse<Data> ) => {
    try {
      
    createDidEthr();
    console.log( 'test');
    return NextResponse.json({
        ok: true,
      });
    } catch (error) {
      console.error(error);
    }
} ;

export const POST = async (req : NextApiRequest , res : NextApiResponse<Data> ) => {
    try {
      
    createDidEthr();
    console.log( 'test');
    return NextResponse.json({
        ok: true,
      });
    } catch (error) {
      console.error(error);
    }
} ;