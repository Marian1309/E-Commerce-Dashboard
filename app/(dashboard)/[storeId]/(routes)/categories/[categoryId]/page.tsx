import { getUniqueCategory, getUserBillboards } from '@/actions';

import { CategoryForm } from './components';

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await getUniqueCategory(params.categoryId);
  const billboards = await getUserBillboards(params.storeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;