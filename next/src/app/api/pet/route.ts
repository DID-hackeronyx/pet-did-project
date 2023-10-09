// express 역할
import prisma from '../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation';

export const GET = async (req, res) => {
  try {

    const { searchParams } = new URL(req.url);
    let did = searchParams.get("did");
    let id = Number(searchParams.get("id"));
    let userId = Number(searchParams.get("userId")) ;
    let unique_key = searchParams.get("unique_key") ;
    let isListing = searchParams.get("isListing") ;
    let response ;

    if( id ) {

      response = await prisma.pet.findFirst({
        where: {
          id ,
        },
      });

    }

    if( isListing ) {

      const bool_data = ( isListing == 't' ? true : false ) ;

      response = await prisma.pet.findMany({
        where: {
          isListing : bool_data
        },
      });

    }
    // console.log( token ) ;

    if( userId ){

    response = await prisma.pet.findMany({
      where: {
        userId ,
      },
    });

    }

    if( did ) {

      response = await prisma.pet.findFirst({
        where: {
          did ,
        },
      });

    }

    if( unique_key ) {

      response = await prisma.pet.findFirst({
        where: {
          unique_key ,
        },
      });

    }

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(error);
  }
};

export const PATCH = async (req, res) => {
  try {
    
    const { id , userId } = await req.json();
    
    const response = await prisma.pet.findFirst({
      where : {
        id , 
      }
    })

    if( !response ) {
      
      return NextResponse.json({
        ok : false ,
      });
    }
    
    if( response.userId != userId ){
      return NextResponse.json({
        ok : false ,
      });
    }

    const update = await prisma.pet.update({
      where : {
        id,
      },
      data: {
        isListing: !response.isListing // isListing을 반전시켜 업데이트
      }
    })

    return NextResponse.json({
      ok : true ,
    });
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // json에 body가 담겨있음

    const { unique_key , pvk , did , userId , image_Url } = await req.json();

    if( !unique_key || !pvk || !did || !userId || !image_Url ) return NextResponse.json( { ok : false } )

    const user = await prisma.pet.create({
        data:{
        pvk ,
        unique_key,
        userId ,
        did , 
        isListing : false ,
        image_Url , 
      }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
  }
};

export const PUT = async (req, res) => {
  try {
    
    const { id , userId } = await req.json();
    
    const response = await prisma.pet.findFirst({
      where : {
        id , 
      }
    })

    if( !response ) {
      
      return NextResponse.json({
        ok : false ,
      });
    }
    
    if( response.userId != userId ){
      return NextResponse.json({
        ok : false ,
      });
    }

    const update = await prisma.pet.update({
      where : {
        id,
      },
      data: {
        userId ,
        isListing: false // isListing을 반전시켜 업데이트
      }
    })

    return NextResponse.json({
      ok : true ,
    });
  } catch (error) {
    console.error(error);
  }
};
