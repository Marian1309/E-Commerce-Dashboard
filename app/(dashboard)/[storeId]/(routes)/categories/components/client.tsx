'use client';

import type { FC } from 'react';

import { ApiList, DataTable, Header, Heading } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

import type { CategoryColumn } from './columns';
import { columns } from './columns';

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: FC<CategoriesClientProps> = ({ data }) => {
  return (
    <>
      <Header dataArrayLength={data.length} title='Categories' />

      <DataTable columns={columns} data={data} searchKey='name' />

      <div className='p-4 pl-0'>
        <Heading title='API' description='API calls for categories' />

        <Separator className='my-4' />

        <ApiList entityName='categories' entityIdName='categoriesId' />
      </div>
    </>
  );
};

export default CategoriesClient;
