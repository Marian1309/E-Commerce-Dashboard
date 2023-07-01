import { prismadb } from '@/lib/db';

const getUserStores = async (userId: string) => {
  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  });

  return stores;
};

export default getUserStores;
