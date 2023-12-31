import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import {
  JsonSchema,
  SchemaManager,
  createCredentialFromSchema,
  EthrDIDMethod,
} from '@jpmorganchase/onyx-ssi-sdk';

const ethrProvider = {
  name: 'maticmum',
  chainId: 80001,
  rpcUrl: process.env.NETWORK_RPC_URL,
  registry: 0xa189b3ceef649763fdc648edd563362e1f7f2e7c,
  gasSource: '',
};

const VC_SCHEMA_URL = 'https://raw.githubusercontent.com/arypte/DID_Hackathon/main/onyx_sdk/src/services/common/schemas/definitions/proofOfdog.json' ;

export const GET = async (req, res) => {
  try {

    const { searchParams } = new URL(req.url);
    let petId = Number(searchParams.get("petId") ) ;
    // console.log(petId , typeof petId ) ;

    const response = await prisma.vc.findFirst({
      where: {
        petId,
      },
    });

    if (!response ) {

      return NextResponse.json(
        {
          ok: false,
          error: "Not exist User.",
        },
      );
    }

    return NextResponse.json({
      ok: true ,
      response ,
    });
  } catch (error) {
    console.error(error);
  }
};


export const POST = async (req : NextApiRequest , res : NextApiResponse ) => {
    try {

      const { did , name , r_date , m_records , petId } = await req.json();
  //  console.log( did , name , r_date , m_records ) ;
        
    const didEthr = new EthrDIDMethod(ethrProvider);

    const issuerDidWithKeys = await didEthr.generateFromPrivateKey(
        '0x98ffa73fb2cf973f36769bb26c472f384edc945d4f7be7723daf84fe8e0adafb'
    );

    const holderDidWithKeys = did ;

  const vcDidKey = (await didEthr.create()).did;

  const credentialType = 'PROOF_OF_Dog';

  const subjectData: Object = {
    name ,
    m_records ,
    r_date ,
  };

  //Setting an expiration data parameter for the VC
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(new Date().getFullYear() + 1);

  const expirationDate = oneYearFromNow.toISOString();

  const additionalParams = {
    id: vcDidKey,
    expirationDate: expirationDate,
  };

  //Schema validation
  const proofOfAddressSchema = await SchemaManager.getSchemaRemote(
    VC_SCHEMA_URL
  );

  const validation: any = await SchemaManager.validateCredentialSubject(
    subjectData,
    proofOfAddressSchema as JsonSchema
  );

  let vc ;

  if (validation) {
    console.log(
      `\nGenerating Verifiable Credential of type ${credentialType}\n`
    );

    vc = await createCredentialFromSchema(
      VC_SCHEMA_URL,
      issuerDidWithKeys.did,
      holderDidWithKeys ,
      subjectData,
      credentialType,
      additionalParams
    );
    
    // console.log(vc.id);

    // model Vc{
    //   id              Int       @default(autoincrement()) @id
    //   createdAt       DateTime  @default(now())
    //   updatedAt       DateTime  @updatedAt
    //   petId           Int
    //   pet             Pet      @relation(fields: [petId], references: [id])
    //   holderdid       String
    //   issuerdid       String
    //   name            String
    //   r_date          String
    //   m_records       String
    //   did             String       
    // }

    // console.log( petId , typeof petId ) ;

    const user = await prisma.vc.create({
      data:
      {
      petId ,
      name,
      r_date ,
      m_records , 
      did : vc.id ,
      holderdid : did , 
      issuerdid : issuerDidWithKeys.did ,
    }
  });

    }
    return NextResponse.json({ 
        vc
    } ) ;
  
    } catch (error) {
      console.error(error);
    }
} ;