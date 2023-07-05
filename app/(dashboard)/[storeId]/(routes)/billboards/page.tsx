import type { BillboardColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import { Client } from '@/common/ui/self';

import { columns } from './components/columns';

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
      <Client
        data={formattedBillboards}
        columns={columns}
        headerTile='Billboards'
        searchKey='label'
      />
    </div>
  );
};

export default Billboards;
