import type { ColumnDef } from '@tanstack/react-table';
import type { LucideIcon } from 'lucide-react';

export type Route = {
  id: number;
  href: string;
  label: 'Overview' | 'Billboards' | 'Categories' | 'Sizes' | 'Settings';
  active: boolean;
};

export type DropdownMenuItem = {
  id: number;
  label: 'Copy Id' | 'Update' | 'Delete';
  onClick: () => void;
  icon: LucideIcon;
};

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export type ClientType = {
  data: (BillboardColumn | CategoryColumn | SizeColumn)[];
  columns: ColumnDef<any>[];
  headerTile: 'Billboards' | 'Categories' | 'Sizes';
  searchKey: 'label' | 'name';
};
