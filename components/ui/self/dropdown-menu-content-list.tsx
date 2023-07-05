import type { FC } from 'react';

import type { DropdownMenuItem as DropdownMenuItemType } from '@/types';

import { DropdownMenuItem } from '../dropdown-menu';

interface DropdownMenuContentListProps {
  dropdownMenuItems: DropdownMenuItemType[];
}

const DropdownMenuContentList: FC<DropdownMenuContentListProps> = ({
  dropdownMenuItems
}) => {
  return (
    <>
      {dropdownMenuItems.map(({ id, onClick, label, icon: Icon }) => (
        <DropdownMenuItem className='cursor-pointer' onClick={onClick} key={id}>
          <Icon className='mr-2 h-4 w-4' />
          {label}
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default DropdownMenuContentList;
