import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

type BillboardsRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: BillboardsRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDS_POST]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET: BillboardsRoute = async (_, { params }) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDS_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
