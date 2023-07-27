import Stripe from 'stripe';

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY as string;

const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2022-11-15',
  typescript: true
});

export default stripe;
