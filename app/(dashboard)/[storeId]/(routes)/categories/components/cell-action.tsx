'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';

import type {
  CategoryColumn,
  DropdownMenuItem as DropdownMenuItemType
} from '@/types';

import { copyToClipboard } from '@/lib/utils';

import DropdownMenuContentList from '@/components/blocks/dropdown-menu-content-list';
import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const DROPDOWN_MENU_ITEMS: DropdownMenuItemType[] = [
    {
      id: 1,
      label: 'Copy Id',
      onClick: () => copyToClipboard(data.id, 'Category Id'),
      icon: Copy
    },
    {
      id: 2,
      label: 'Update',
      onClick: () => router.push(`/${params.storeId}/categories/${data.id}`),
      icon: Edit
    },
    {
      id: 3,
      label: 'Delete',
      onClick: () => setIsOpen(true),
      icon: Trash
    }
  ];

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);

      router.refresh();

      toast.success(`Category \`${data.name}\` deleted.`);
    } catch (error: any) {
      toast.error(error.response.data);
      console.clear();
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
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
