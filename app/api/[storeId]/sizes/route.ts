import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type BillboardsRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: BillboardsRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

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

    const size = await prismaClient.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(size, { status: 200 });
  } catch (err: unknown) {
    console.log('[SIZE_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET: BillboardsRoute = async (_, { params }) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const sizes = await prismaClient.size.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(sizes, { status: 200 });
  } catch (err: unknown) {
    console.log('[SIZES_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
