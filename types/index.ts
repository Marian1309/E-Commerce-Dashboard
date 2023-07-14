import type { ColumnDef } from '@tanstack/react-table';
import type { LucideIcon } from 'lucide-react';

export type Route = {
  id: number;
  href: string;
  label:
    | 'Overview'
    | 'Billboards'
    | 'Categories'
    | 'Sizes'
    | 'Settings'
    | 'Colors'
    | 'Products'
    | 'Orders';
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

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export type ClientType = {
  data: (
    | BillboardColumn
    | CategoryColumn
    | SizeColumn
    | ColorColumn
    | ProductColumn
    | OrderColumn
  )[];
  columns: ColumnDef<any>[];
  headerTile:
    | 'Billboards'
    | 'Categories'
    | 'Sizes'
    | 'Colors'
    | 'Products'
    | 'Orders';
  searchKey: 'label' | 'name' | 'products';
};
