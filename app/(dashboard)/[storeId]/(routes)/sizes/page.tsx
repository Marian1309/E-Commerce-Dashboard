import { formatDate } from '@/lib/utils';

import { getUserSizes } from '@/actions';

import { BillboardClient } from './components';
import type { SizesColumn } from './components/columns';

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await getUserSizes(params.storeId);

  const formattedSizes: SizesColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: formatDate(size.createdAt, 'MMMM D, YYYY')
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-x-4 pt-6'>
        <BillboardClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
