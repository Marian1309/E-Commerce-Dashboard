import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    const { name } = await req.json();

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

    const store = await prismaClient.store.create({
      data: {
        name,
        userId
      }
    });

    return NextResponse.json(store, { status: 200 });
  } catch (err: unknown) {
    console.log('[STORES_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
