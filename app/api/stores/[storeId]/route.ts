import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type StoreIdRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const PATCH: StoreIdRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismaClient.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store, { status: 200 });
  } catch (err: unknown) {
    console.log('[STORES_STOREID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE: StoreIdRoute = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismaClient.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    return NextResponse.json(store, { status: 200 });
  } catch (err: unknown) {
    console.log('[STORES_STOREID_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
