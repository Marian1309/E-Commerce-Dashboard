import prismaClient from '@/lib/db';

import { CategoryForm } from './components';

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await prismaClient.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await prismaClient.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <CategoryForm billboards={billboards} initialData={category} />
    </div>
  );
};

export default CategoryPage;
