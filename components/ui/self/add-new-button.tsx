'use client';

import type { FC } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '../button';

interface AddNewButtonProps {
  onClick: () => void;
}

const AddNewButton: FC<AddNewButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Plus className='mr-2 h-4 w-4' />
      Add New
    </Button>
  );
};

export default AddNewButton;
