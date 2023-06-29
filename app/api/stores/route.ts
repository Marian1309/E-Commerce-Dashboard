import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    if (!name) {
      return NextResponse.json('Name is required', { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (err: unknown) {
    console.log('[STORES_POST]', err);
    return NextResponse.json('Internal errro', { status: 500 });
  }
};
