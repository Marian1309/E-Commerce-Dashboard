import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import type { SizesColumn } from './components';
import { BillboardClient } from './components';

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismaClient.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizesColumn[] = sizes.map(
    ({ id, name, value, createdAt }) => ({
      id,
      name,
      value,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <BillboardClient data={formattedSizes} />
    </div>
  );
};

export default Sizes;
