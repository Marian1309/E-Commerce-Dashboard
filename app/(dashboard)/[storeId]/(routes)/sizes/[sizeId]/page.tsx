import prismaClient from '@/lib/db';

import { SizeForm } from './components';

interface SizePageProps {
  params: {
    sizeId: string;
  };
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await prismaClient.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <SizeForm initialData={size} />
    </div>
  );
};

export default SizePage;
