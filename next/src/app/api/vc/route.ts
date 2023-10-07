import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
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

// const createVcWithAdditonalParams = async (VC_SCHEMA_URL: string) => {
//   const didEthr = new EthrDIDMethod(ethrProvider);

//   const issuerDidWithKeys = await didEthr.generateFromPrivateKey(
//     ISSUER_ES256K_PRIVATE_KEY
//   );

//   const holderDidWithKeys = await didEthr.generateFromPrivateKey(
//     HOLDER_ES256K_PRIVATE_KEY
//   );

//   const vcDidKey = (await didEthr.create()).did;

//   const credentialType = 'PROOF_OF_Dog';

//   const subjectData: Object = {
//     name: 'Jessie Doe',
//     m_records: 'Anytown',
//     r_date: '070803',
//   };

//   //Setting an expiration data parameter for the VC
//   const oneYearFromNow = new Date();
//   oneYearFromNow.setFullYear(new Date().getFullYear() + 1);

//   const expirationDate = oneYearFromNow.toISOString();

//   const additionalParams = {
//     id: vcDidKey,
//     expirationDate: expirationDate,
//   };

//   //Schema validation
//   const proofOfAddressSchema = await SchemaManager.getSchemaRemote(
//     VC_SCHEMA_URL
//   );

//   const validation: any = await SchemaManager.validateCredentialSubject(
//     subjectData,
//     proofOfAddressSchema as JsonSchema
//   );

//   if (validation) {
//     console.log(
//       `\nGenerating Verifiable Credential of type ${credentialType}\n`
//     );

//     const vc = await createCredentialFromSchema(
//       VC_SCHEMA_URL,
//       issuerDidWithKeys.did,
//       holderDidWithKeys.did,
//       subjectData,
//       credentialType,
//       additionalParams
//     );

//     console.log(JSON.stringify(vc, null, 2));
//   } else {
//     console.log(validation.errors);
//   }
// };


export const GET = async (req : NextApiRequest , res : NextApiResponse<Data> ) => {
    try {
      
    console.log( ethrProvider.rpcUrl ) ;
    console.log( 'test');
    return NextResponse.json({
        ok: true,
      });
    } catch (error) {
      console.error(error);
    }
} ;