'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

import { ApiList, DataTable, Heading } from '@/common/ui';
import { Button } from '@/common/ui/button';
import { Separator } from '@/common/ui/separator';

import type { SizesColumn } from './columns';
import { columns } from './columns';

interface SizesClientProps {
  data: SizesColumn[];
}

const SizesClient: FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams() as { storeId: string };

  return (
    <>
      <div className='p-4 flex-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />

        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>

      <DataTable columns={columns} data={data} searchKey='name' />

      <div className='p-4 pl-0'>
        <Heading title='API' description='API calls for sizes' />

        <Separator />

        <ApiList entityName='sizes' entityIdName='sizesId' />
      </div>
    </>
  );
};

export default SizesClient;
