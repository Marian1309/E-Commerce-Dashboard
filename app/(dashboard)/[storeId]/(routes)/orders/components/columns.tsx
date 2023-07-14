'use client';

import type { ColumnDef } from '@tanstack/react-table';

import type { OrderColumn } from '@/types';

import CellAction from './cell-action';

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Products'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
