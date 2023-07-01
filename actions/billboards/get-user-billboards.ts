import { prismadb } from '@/lib/db';

const getUserBillboards = async (storeId: string) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return billboards;
};

export default getUserBillboards;
