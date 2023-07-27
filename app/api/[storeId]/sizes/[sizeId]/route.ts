import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

type BillboardIdType = (
  req: NextRequest,
  { params }: { params: { sizeId: string; storeId: string } }
) => void;

export const GET: BillboardIdType = async (_, { params }) => {
  try {
    if (!params.sizeId) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    const size = await prismaClient.size.findUnique({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size, { status: 200 });
  } catch (err: unknown) {
    console.log('[SIZE_ID_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE: BillboardIdType = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (userId !== ADMIN_USER_ID) {
      return new NextResponse('You are not able to do this action.', {
        status: 404
      });
    }

    if (!params.sizeId) {
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

    const size = await prismaClient.size.delete({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_ID_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const PATCH: BillboardIdType = async (req, { params }) => {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (userId !== ADMIN_USER_ID) {
      return new NextResponse('You are not able to do this action.', {
        status: 404
      });
    }

    if (userId !== ADMIN_USER_ID) {
      return new NextResponse('You are not able to do this action.');
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.sizeId) {
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

    const size = await prismaClient.size.updateMany({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    });

    return NextResponse.json(size, { status: 200 });
  } catch (err: unknown) {
    console.log('[SIZE_ID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
