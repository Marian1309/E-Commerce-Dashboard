import type { CategoryColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import Client from '@/components/blocks/client';

import { columns } from './components/columns';

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismaClient.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, billboard, createdAt }) => ({
      id,
      name,
      billboardLabel: billboard.label,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <Client
        data={formattedCategories}
        columns={columns}
        headerTile='Categories'
        searchKey='name'
      />
    </div>
  );
};

export default Categories;
