import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

import prismaClient from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 409 });
  }

  const products = await prismaClient.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });
};
