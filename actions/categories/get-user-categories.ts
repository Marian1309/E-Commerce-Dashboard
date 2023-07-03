import { prismadb } from '@/lib/db';

const getUserCategories = async (storeId: string) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return categories;
};

export default getUserCategories;
