'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

import { ApiList, DataTable, Heading } from '@/common/ui';
import { Button } from '@/common/ui/button';
import { Separator } from '@/common/ui/separator';

import type { CategoryColumn } from './columns';
import { columns } from './columns';

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: FC<CategoriesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams() as { storeId: string };

  return (
    <>
      <div className='p-4 flex-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>

      <DataTable columns={columns} data={data} searchKey='name' />

      <div className='p-4 pl-0'>
        <Heading title='API' description='API calls for categories' />

        <Separator />

        <ApiList entityName='categories' entityIdName='categoriesId' />
      </div>
    </>
  );
};

export default CategoriesClient;
