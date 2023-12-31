import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

type ProductRoute = (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => void;

export const POST: ProductRoute = async (req, { params }) => {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (userId !== ADMIN_USER_ID) {
      return new NextResponse('You are not able to do this action.', {
        status: 404
      });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category Id is required', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('Size Id is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color Id is required', { status: 400 });
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

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err: unknown) {
    console.log('[PRODUCTS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET: ProductRoute = async (req, { params }) => {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await prismaClient.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (err: unknown) {
    console.log('[PRODUCTS_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
