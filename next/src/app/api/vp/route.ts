import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import {
  JsonSchema,
  SchemaManager,
  createCredentialFromSchema,
  EthrDIDMethod,
  createPresentation,
  KeyDIDMethod,
  JWTService,
  createAndSignPresentationJWT,
  
  
} from '@jpmorganchase/onyx-ssi-sdk';
import vc from "../vc/route"
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'


const ethrProvider = {
  name: 'maticmum',
  chainId: 80001,
  rpcUrl: process.env.NETWORK_RPC_URL,
  registry: 0xa189b3ceef649763fdc648edd563362e1f7f2e7c,
  gasSource: '',
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const didKey = new KeyDIDMethod();
    const holderDID = await didKey.create();

    const didEthr = new EthrDIDMethod(ethrProvider);
    const holderEthrDid = await didEthr.create();


    //  // returns the signed VP as a JWT string
    //  const vpJwt = await createAndSignPresentationJWT(
    //      subjectDID,
    //      vcs,
    //      options)  
    //Create Presentation from VC JWT

    const jwtService = new JWTService()
    const jwtVC = await jwtService.signVC(issuerEthrDid, vc)
    console.log(jwtVC)

    const vp = await createPresentation(holderEthrDid, [jwtVC])
    console.log(JSON.stringify(vp, null, 2))
   
    const jwtVP = await jwtService.signVP(holderDID, vp)
    console.log(jwtVP)
   
       
//create DID resolvers
const ethrResolver = getEthrResolver(ethrProvider)
const keyResolver = getKeyResolver()
const didResolver = new Resolver({
    ...ethrResolver, 
    ...keyResolver})
   
   
//Verify VC JWT from Issuer
const resultVc = await verifyCredentialJWT(jwtVC, didResolver)
console.log(resultVc)
       
//Verify VP JWT from Holder
const resultVp = await verifyPresentationJWT(jwtVP, didResolver)
console.log(resultVp)

  } catch (error) {
    console.error(error);
  }
};
