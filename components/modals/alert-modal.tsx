'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Modal from '@/components/blocks/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='w-full space-x-2 pt-6 flex-end'>
        <Button disabled={isLoading} variant='outline' onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
