import type { ColorColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import Client from '@/components/blocks/client';

import { columns } from './components/columns';

const Colors = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismaClient.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map(
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
        data={formattedColors}
        columns={columns}
        headerTile='Colors'
        searchKey='name'
      />
    </div>
  );
};

export default Colors;
