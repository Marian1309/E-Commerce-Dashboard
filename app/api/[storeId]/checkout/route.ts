import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type Stripe from 'stripe';

import prismaClient from '@/lib/db';
import { stripe } from '@/lib/stripe';

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

  const order = await prismaClient.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.NEXT_PUBLIC_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  });

  return NextResponse.json(
    { url: session.url },
    { headers: corsHeaders, status: 200 }
  );
};
