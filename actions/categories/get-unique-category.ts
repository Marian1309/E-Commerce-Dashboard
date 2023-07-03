import { prismadb } from '@/lib/db';

const getUniqueCategory = async (categoryId: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId
    }
  });

  return category;
};

export default getUniqueCategory;
