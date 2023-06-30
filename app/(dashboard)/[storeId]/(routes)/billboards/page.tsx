import { prismadb } from '@/lib/db';
import { formatDate } from '@/lib/utils';

import { BillboardClient } from './components';

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: {
    id: string;
    label: string;
    createdAt: string;
  }[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: formatDate(billboard.createdAt, 'MMMM d, yyyy')
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-x-4 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
