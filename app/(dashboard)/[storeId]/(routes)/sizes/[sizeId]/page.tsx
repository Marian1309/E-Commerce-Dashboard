import { getUniqueSize } from '@/actions';

import { SizeForm } from './components';

interface BillboardPageProps {
  params: {
    sizeId: string;
  };
}

const SizePage = async ({ params }: BillboardPageProps) => {
  const size = await getUniqueSize(params.sizeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
