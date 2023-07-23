'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';

import type {
  DropdownMenuItem as DropdownMenuItemType,
  OrderColumn
} from '@/types';

import { copyToClipboard } from '@/lib/utils';

import DropdownMenuContentList from '@/common/blocks/dropdown-menu-content-list';
import AlertModal from '@/common/modals/alert-modal';
import { Button } from '@/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/common/ui/dropdown-menu';

interface CellActionProps {
  data: OrderColumn;
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const DROPDOWN_MENU_ITEMS: DropdownMenuItemType[] = [
    {
      id: 1,
      label: 'Copy Id',
      onClick: () => copyToClipboard(data.id, 'Order Id'),
      icon: Copy
    },
    {
      id: 2,
      label: 'Update',
      onClick: () => router.push(`/${params.storeId}/orders/${data.id}`),
      icon: Edit
    },
    {
      id: 3,
      label: 'Delete',
      onClick: () => setOpen(true),
      icon: Trash
    }
  ];

  const handleBillboardDeleting = async () => {
    try {
      setIsLoading(true);

      router.refresh();

      toast.success(`Order with id \`${data.id}\` deleted.`);
    } catch (error: unknown) {
      toast.error(
        'Make sure you removed all categories using this billboard first.'
      );
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleBillboardDeleting}
        isLoading={isLoading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='h-8 w-8 p-0' variant='ghost'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuContentList dropdownMenuItems={DROPDOWN_MENU_ITEMS} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
