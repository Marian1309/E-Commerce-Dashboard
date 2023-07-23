import { NextResponse } from 'next/server';

import axios from 'axios';

import prismaClient from '@/lib/db';

export const GET = async () => {
  try {
    const { data: storeId } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storeId`
    );

    const billboard = await prismaClient.category.findFirst({
      where: {
        storeId
      }
    });

    const billboardId = billboard?.billboardId;

    return NextResponse.json(billboardId, { status: 200 });
  } catch (err: unknown) {
    console.log('[BILLBOARDID_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
