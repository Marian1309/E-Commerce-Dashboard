export type Route = {
  id: number;
  href: string;
  label: 'Overview' | 'Billboards' | 'Categories' | 'Sizes' | 'Settings';
  active: boolean;
};

type TableName = any;

export type GetUserTableFn = (userId: string, tableName: TableName) => void;
