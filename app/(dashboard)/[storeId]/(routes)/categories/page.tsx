import prismaClient from '@/lib/db';
import { formatDate } from '@/lib/utils';

import type { CategoryColumn } from './components';
import { CategoriesClient } from './components';

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

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: formatDate(category.createdAt, 'MMMM D, YYYY')
  }));

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <CategoriesClient data={formattedCategories} />
    </div>
  );
};

export default Categories;
