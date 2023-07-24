import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

type CategoryRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: CategoryRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
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

    const category = await prismaClient.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET: CategoryRoute = async (_, { params }) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const categories = await prismaClient.category.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err: unknown) {
    console.log('[CATEGORY_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
