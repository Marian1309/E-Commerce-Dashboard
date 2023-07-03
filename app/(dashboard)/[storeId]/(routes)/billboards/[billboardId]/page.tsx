import { getUniqueBillboard } from '@/actions';

import { BillboardForm } from './components';

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await getUniqueBillboard(params.billboardId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
