import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type ColorsRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: ColorsRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    console.log(userId);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prismaClient.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err: unknown) {
    console.log('[COLOR_POST]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET: ColorsRoute = async (_, { params }) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const colors = await prismaClient.color.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(colors, { status: 200 });
  } catch (err: unknown) {
    console.log('[COLORS_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
