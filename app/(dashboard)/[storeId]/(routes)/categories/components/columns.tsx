'use client';

import type { ColumnDef } from '@tanstack/react-table';

import type { CategoryColumn } from '@/types';

import CellAction from './cell-action';

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'billboard',
    header: 'billboard',
    cell: ({ row }) => row.original.billboardLabel
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
