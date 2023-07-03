import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type BillboardIdType = (
  req: NextRequest,
  { params }: { params: { billboardId: string; storeId: string } }
) => void;

export const GET: BillboardIdType = async (_, { params }) => {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await prismaClient.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDID_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE: BillboardIdType = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const billboard = await prismaClient.billboard.delete({
      where: {
        id: params.billboardId
      }
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDID_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PATCH: BillboardIdType = async (req, { params }) => {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await prismaClient.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const billboard = await prismaClient.billboard.updateMany({
      where: {
        id: params.billboardId
      },
      data: {
        label,
        imageUrl
      }
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDID_PATCH]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
