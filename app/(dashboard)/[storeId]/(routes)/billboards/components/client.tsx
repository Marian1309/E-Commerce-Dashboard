'use client';

import type { FC } from 'react';

import { ApiList, DataTable, Header, Heading } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

import type { BillboardColumn } from './columns';
import { columns } from './columns';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  return (
    <>
      <Header dataArrayLength={data.length} title='Billboards' />

      <DataTable columns={columns} data={data} searchKey='label' />

      <div className='p-4 pl-0'>
        <Heading title='API' description='API calls for billboards' />

        <Separator className='my-4' />

        <ApiList entityName='billboards' entityIdName='billboardId' />
      </div>
    </>
  );
};

export default BillboardClient;
