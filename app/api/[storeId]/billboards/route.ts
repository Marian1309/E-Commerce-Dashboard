import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

type BillboardRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: BillboardRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (userId !== ADMIN_USER_ID) {
      return new NextResponse('You are not able to do this action.', {
        status: 404
      });
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

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismaClient.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET: BillboardRoute = async (_, { params }) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const billboards = await prismaClient.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDS_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
