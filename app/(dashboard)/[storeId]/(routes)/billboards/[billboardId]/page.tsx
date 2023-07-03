import prismaClient from '@/lib/db';

import { BillboardForm } from './components';

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await prismaClient.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  });

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <BillboardForm initialData={billboard} />
    </div>
  );
};

export default BillboardPage;
