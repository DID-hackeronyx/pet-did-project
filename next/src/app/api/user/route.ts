// express 역할
import prisma from '../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation';

export const GET = async (req, res) => {
  try {

    const { searchParams } = new URL(req.url);
    let token = searchParams.get("token");
    // console.log( token ) ;

    const user = await prisma.user.findFirst({
      where: {
        unique_key: token,
      },
    });

    if (!user) {

      return NextResponse.json(
        {
          ok: false,
          error: "Not exist User.",
        },
      );
    }

    return NextResponse.json({
      ok: true ,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// 함수명이 해당하는 요청으로 정해져있음. (POST), DB와 상호작용하니 비동기로 해야 함
// 응답 할 때 까지 기다려서 응답이 꼭 있어야 함.
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // json에 body가 담겨있음

    const { unique_key , pvk, name } = await req.json();

    const user = await prisma.user.create({
        data:{
        pvk ,
        name,
        unique_key,
      }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
  }
};
