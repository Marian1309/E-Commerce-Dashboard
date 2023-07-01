import { prismadb } from '@/lib/db';

const getUserFirstStore = async (userId: string, storeId?: string) => {
  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: storeId
    }
  });

  return store;
};

export default getUserFirstStore;
