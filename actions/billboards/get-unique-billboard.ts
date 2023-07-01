import { prismadb } from '@/lib/db';

const getUniqueBillboard = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId
    }
  });

  return billboard;
};

export default getUniqueBillboard;
