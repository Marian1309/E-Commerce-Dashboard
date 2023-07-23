import type { OrderColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate, formatPrice } from '@/lib/utils';

import { Client } from '@/common/ui/self';

import { columns } from './components/columns';

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismaClient.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map(
    ({ id, phone, address, orderItems, createdAt, isPaid }) => ({
      id,
      phone,
      address,
      products: orderItems
        .map((orderItem) => orderItem.product.name)
        .join(', '),
      totalPrice: formatPrice(
        orderItems.reduce((acc, curr) => {
          return acc + Number(curr.product.price);
        }, 0)
      ),
      isPaid,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <Client
        data={formattedOrders}
        columns={columns}
        headerTile='Orders'
        searchKey='products'
        isOrder
      />
    </div>
  );
};

export default Orders;
