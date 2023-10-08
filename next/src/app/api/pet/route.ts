// express 역할
import prisma from '../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation';

export const GET = async (req, res) => {
  try {

    const { searchParams } = new URL(req.url);
    let did = searchParams.get("did");
    let userId = Number(searchParams.get("userId"));
    // console.log( token ) ;

    let response ;

    if( !did ){

    response = await prisma.pet.findMany({
      where: {
        userId ,
      },
    });

    }

    if( !userId ) {

      response = await prisma.pet.findFirst({
        where: {
          did ,
        },
      });

    }

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// 함수명이 해당하는 요청으로 정해져있음. (POST), DB와 상호작용하니 비동기로 해야 함
// 응답 할 때 까지 기다려서 응답이 꼭 있어야 함.
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // json에 body가 담겨있음

    const { auth, pvk, nickname, login_type } = await req.json();
    // console.log(auth, pvk, nickname, pvk);

    // upsert = update + create (처음 들어오면 만들고 있으면 업데이트)
    const user = await prisma.user.upsert({
      where: { auth },
      update: {},
      create: {
        login_type,
        address: pvk,
        nickname,
        auth,
        count: 0,
      },
    });

    // console.log()는 npm run dev 했던 터미널에서 확인 가능

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
};
