'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useSizeIdStore } from '@/hooks';

import { AlertModal } from '@/common/modals';
import { Button } from '@/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/common/ui/dropdown-menu';

import type { SizesColumn } from './columns';

interface CellActionProps {
  data: SizesColumn;
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const { isOpen, isLoading, setIsOpen, setIsLoading } = useSizeIdStore();

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Size Id copied to the clipboard.');
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();
      toast.success(`Size \`${data.name}\` deleted.`);
    } catch (error: any) {
      toast.error('Make sure you removed all products using this size first.');
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

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => onCopy(data.id)}
          >
            <Copy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setIsOpen(true)}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
