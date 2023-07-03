'use client';

import type { FC } from 'react';

import { ApiList, DataTable, Header, Heading } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

import type { SizesColumn } from './columns';
import { columns } from './columns';

interface SizesClientProps {
  data: SizesColumn[];
}

const SizesClient: FC<SizesClientProps> = ({ data }) => {
  return (
    <>
      <Header dataArrayLength={data.length} title='Sizes' />

      <DataTable columns={columns} data={data} searchKey='name' />

      <div className='p-4 pl-0'>
        <Heading title='API' description='API calls for sizes' />

        <Separator className='my-4' />

        <ApiList entityName='sizes' entityIdName='sizesId' />
      </div>
    </>
  );
};

export default SizesClient;
