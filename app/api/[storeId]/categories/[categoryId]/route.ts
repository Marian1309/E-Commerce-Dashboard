import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

type BillboardIdType = (
  req: NextRequest,
  { params }: { params: { categoryId: string; storeId: string } }
) => void;

export const GET: BillboardIdType = async (_, { params }) => {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId
      },
      include: {
        billboard: true
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_ID_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE: BillboardIdType = async (_, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_ID_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const PATCH: BillboardIdType = async (req, { params }) => {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_ID_PATCH]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
