import { prismadb } from '@/lib/db';

const getUniqueSize = async (sizeId: string) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId
    }
  });

  return size;
};

export default getUniqueSize;
