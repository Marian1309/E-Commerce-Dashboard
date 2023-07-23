import { NextResponse } from 'next/server';

import prismaClient from '@/lib/db';

export const GET = async () => {
  try {
    const userId = 'user_2RtGt5quTPApMsgzfdO7Ss8yZ8a';

    const store = await prismaClient.store.findFirst({
      where: {
        userId
      }
    });

    const storeId = store?.id;

    return NextResponse.json(storeId, { status: 200 });
  } catch (err: unknown) {
    console.log('[STOREID_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
