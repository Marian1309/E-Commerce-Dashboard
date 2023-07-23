import prismaClient from '@/lib/db';

const getStockCount = async (storeId: string) => {
  const stockCount = await prismaClient.product.count({
    where: {
      storeId,
      isArchived: false
    }
  });

  return stockCount;
};

export default getStockCount;
