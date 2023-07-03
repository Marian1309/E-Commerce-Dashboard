import { prismadb } from '@/lib/db';

const getUserSizes = async (storeId: string) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return sizes;
};

export default getUserSizes;
