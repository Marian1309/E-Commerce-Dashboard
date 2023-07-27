import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

type ProductIdType = (
  req: NextRequest,
  { params }: { params: { productId: string; storeId: string } }
) => void;

export const GET: ProductIdType = async (_, { params }) => {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismaClient.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err: unknown) {
    console.log('[PRODUCTID_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE: ProductIdType = async (_, { params }) => {
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

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
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

    const product = await prismaClient.product.delete({
      where: {
        id: params.productId
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err: unknown) {
    console.log('[PRODUCTID_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const PATCH: ProductIdType = async (req, { params }) => {
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
      return new NextResponse('Unauthorized', { status: 405 });
    }

    await prismaClient.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {}
        }
      }
    });

    const product = await prismaClient.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err: unknown) {
    console.log('[PRODUCTID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
