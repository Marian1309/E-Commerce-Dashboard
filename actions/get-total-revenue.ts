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

  const totalRevenue = paidOrders.reduce((totalAcc, order) => {
    const orderTotal = order.orderItems.reduce((orderTotalAcc, item) => {
      return orderTotalAcc + item.product.price.toNumber();
    }, 0);

    return orderTotal + totalAcc;
  }, 0);

  return totalRevenue;
};

export default getTotalRevenue;
