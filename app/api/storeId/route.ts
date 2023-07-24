import { NextResponse } from 'next/server';

import prismaClient from '@/lib/db';

import { corsHeaders } from '../headers';

export const GET = async () => {
  try {
    const userId = 'user_2RtGt5quTPApMsgzfdO7Ss8yZ8a'; // Hard coded (My Id)

    const store = await prismaClient.store.findFirst({
      where: {
        userId
      }
    });

    const storeId = store?.id;

    return NextResponse.json(storeId, { status: 200, headers: corsHeaders });
  } catch (err: unknown) {
    console.log('[STOREID_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
