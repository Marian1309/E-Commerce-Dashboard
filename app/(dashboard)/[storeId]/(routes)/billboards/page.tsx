import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import type { BillboardColumn } from './components';
import { BillboardClient } from './components';

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaClient.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <BillboardClient data={formattedBillboards} />
    </div>
  );
};

export default Billboards;
