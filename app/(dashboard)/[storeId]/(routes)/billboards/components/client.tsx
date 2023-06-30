'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

import { Heading } from '@/common/ui';
import { Button } from '@/common/ui/button';
import { Separator } from '@/common/ui/separator';

interface BillboardClientProps {
  data: {
    id: string;
    label: string;
    createdAt: string;
  }[];
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams() as { storeId: string };

  return (
    <>
      <div className='p-4 flex-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>

      <Separator />
    </>
  );
};

export default BillboardClient;
