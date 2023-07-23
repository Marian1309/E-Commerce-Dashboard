import prismaClient from '@/lib/db';

const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismaClient.order.findMany({
    where: {
      storeId,
      isPaid: true
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  const totalRevenue = paidOrders.reduce((acc, curr) => {
    const orderTotal = curr.orderItems.reduce((acc, curr) => {
      return acc + curr.product.price.toNumber();
    }, 0);

    return acc + orderTotal;
  }, 0);

  return totalRevenue;
};

export default getTotalRevenue;
