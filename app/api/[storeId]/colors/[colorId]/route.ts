import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type ColorIdType = (
  req: NextRequest,
  { params }: { params: { colorId: string; storeId: string } }
) => void;

export const GET: ColorIdType = async (_, { params }) => {
  try {
    if (!params.colorId) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    const color = await prismaClient.color.findUnique({
      where: {
        id: params.colorId
      }
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err: unknown) {
    console.log('[COLOR_ID_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE: ColorIdType = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse('Size id is required', { status: 400 });
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

    const color = await prismaClient.color.delete({
      where: {
        id: params.colorId
      }
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_ID_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PATCH: ColorIdType = async (req, { params }) => {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse('Color id is required', { status: 400 });
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

    const color = await prismaClient.color.updateMany({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err: unknown) {
    console.log('[SIZE_ID_PATCH]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
