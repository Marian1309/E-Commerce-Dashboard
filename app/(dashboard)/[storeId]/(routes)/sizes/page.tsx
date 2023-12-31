import type { SizeColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import Client from '@/components/blocks/client';

import { columns } from './components/columns';

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismaClient.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: { createdAt: 'desc' }
  });

  const formattedSizes: SizeColumn[] = sizes.map(
    ({ id, name, value, createdAt }) => ({
      id,
      name,
      value,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <Client
        data={formattedSizes}
        columns={columns}
        headerTile='Sizes'
        searchKey='name'
      />
    </div>
  );
};

export default Sizes;
