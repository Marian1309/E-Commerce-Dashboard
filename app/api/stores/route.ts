import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
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
    return new NextResponse('Internal errro', { status: 500 });
  }
};
