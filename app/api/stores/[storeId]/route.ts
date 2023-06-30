import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

type Patch = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const PATCH: Patch = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { name } = (await req.json()) as { name: string };

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
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
    console.log('[STORES_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE: Patch = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    return NextResponse.json(store, { status: 200 });
  } catch (err: unknown) {
    console.log('[STORES_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
