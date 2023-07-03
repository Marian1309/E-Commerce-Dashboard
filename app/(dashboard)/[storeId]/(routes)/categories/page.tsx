import { formatDate } from '@/lib/utils';

import { getUserCategories } from '@/actions';

import { CategoriesClient } from './components';
import type { CategoryColumn } from './components/columns';

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await getUserCategories(params.storeId);

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: formatDate(category.createdAt, 'MMMM d, YYYY')
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-x-4 pt-6'>
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
