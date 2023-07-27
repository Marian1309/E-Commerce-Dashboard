import { NextResponse } from 'next/server';

import { ADMIN_USER_ID, CORS_HEADERS } from '@/lib/constants';
import prismaClient from '@/lib/db';

export const GET = async () => {
  try {
    const store = await prismaClient.store.findFirst({
      where: {
        userId: ADMIN_USER_ID
      }
    });

    const storeId = store?.id;

    return NextResponse.json(storeId, { status: 200, headers: CORS_HEADERS });
  } catch (err: unknown) {
    console.log('[STOREID_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
