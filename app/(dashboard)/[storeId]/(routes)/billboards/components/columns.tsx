'use client';

import type { ColumnDef } from '@tanstack/react-table';

import type { BillboardColumn } from '@/types';

import CellAction from './cell-action';

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
