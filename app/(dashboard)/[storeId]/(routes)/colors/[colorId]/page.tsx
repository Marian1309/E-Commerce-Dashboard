import prismaClient from '@/lib/db';

import { ColorForm } from './components';

interface ColorPageProps {
  params: {
    colorId: string;
  };
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const color = await prismaClient.color.findUnique({
    where: {
      id: params.colorId
    }
  });

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <ColorForm initialData={color} />
    </div>
  );
};

export default ColorPage;
