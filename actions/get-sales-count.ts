import prismaClient from '@/lib/db';

const getSalesCount = async (storeId: string) => {
  const salesCount = await prismaClient.order.count({
    where: {
      storeId,
      isPaid: true
    }
  });

  return salesCount;
};

export default getSalesCount;
