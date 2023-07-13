import type { ProductColumn } from '@/types';

import prismaClient from '@/lib/db';
import { formatDate, formatter } from '@/lib/utils';

import { Client } from '@/common/ui/self';

import { columns } from './components/columns';

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismaClient.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map(
    ({
      id,
      name,
      isFeatured,
      isArchived,
      price,
      category,
      size,
      color,
      createdAt
    }) => ({
      id,
      name,
      isFeatured,
      isArchived,
      price: formatter.format(price.toNumber()),
      category: category.name,
      color: color.value,
      size: size.name,
      createdAt: formatDate(createdAt, 'MMMM D, YYYY')
    })
  );

  return (
    <div className='flex-1 space-x-4 pt-6'>
      <Client
        data={formattedProducts}
        columns={columns}
        headerTile='Products'
        searchKey='name'
      />
    </div>
  );
};

export default Products;
